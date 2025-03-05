'use strict';
const {
  DynamoDBClient,
  DynamoDBDocumentClient,
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const crypto = require('crypto');
const fs = require('fs');
const uuid = require('uuid');

const TABLES = {
  SYNONYMS: 'test_gtc_validwords',
  QUESTIONS: 'test_gtc_questions',
  ANSWER_HISTORY: 'prod_gtc_answerhistory',
  USERS: 'prod_gtc_users',
};

const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: JSON.parse(fs.readFileSync('./creds.json').toString()),
});
const ddbDocClient = DynamoDBDocumentClient.from(client); 

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(body),
  };
}

module.exports.validateWord = async (event, context) => {
  if (!event.body) {
    return response(400, {error: 'Missing body with field: word :: string'});
  }
  let {word} = JSON.parse(event.body);

  const data = await ddbDocClient.send(
    new GetItemCommand({
      TableName: TABLES.SYNONYMS,
      Key: {
        word,
      },
    }),
  );

  if (!data.Item) {
    return response(200, {hasMapping: false});
  }

  return response(200, {
    hasMapping: true,
    mapping: data.Item.mapping,
  });
};

module.exports.validWords = async (event, context) => {
  let data = await ddbDocClient.send(
    new ScanCommand({
      TableName: TABLES.SYNONYMS,
    }),
  );

  return response(200, data.Items.map(item => ({
    word: item.word,
    mapping: item.mapping,
  })));
};

module.exports.todaysQuestion = async (event, context) => {
  function datesince(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  const allQuestions = await getAllQuestions();
  if (allQuestions.length === 0) {
    console.error('No questions found!');
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        error: 'No questions found',
      }),
    };
  }

  // Get current question ID from day, starting on 01/03/2022
  const dayId =
    datesince(
      new Date(2022, 3, 1),
      event.queryStringParameters?.local_time
        ? new Date(Date.parse(event.queryStringParameters?.local_time))
        : new Date(),
    ) % allQuestions.length;

  // Get todays question from dyndb
  const data = await client.send(
    new GetItemCommand({
      TableName: TABLES.QUESTIONS,
      Key: {
        id: {S: dayId.toString()},
      },
    }),
  );

  if (!data.Item) {
    console.error("No question found for today's question!");
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        error: 'No question found for today',
      }),
    };
  }

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      id: data.Item.id.S,
      answer: data.Item.answer.S,
      hints: data.Item.hints.L.map(x => x.S),
      synonyms: data.Item.synonyms.L.map(x => x.S),
    }),
  };
  return response;
};

module.exports.allQuestions = async (event, context) => {
  let data = await client.send(
    new ScanCommand({
      TableName: TABLES.QUESTIONS,
    }),
  );
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(
      data.Items.map(item => ({
        id: item.id.S,
        answer: item.answer.S,
        hints: item.hints.L.map(x => x.S),
        synonyms: item.synonyms.L.map(x => x.S),
      })),
    ),
  };

  return response;
};

module.exports.addQuestion = async (event, context) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        error:
          'Missing body with fields: id :: string, answer :: string, hints :: string[], synonyms :: string[]',
      }),
    };
  }

  // Get all existing questions
  let questions = await getAllQuestions();
  // Take the highest id and add 1
  let id = (Math.max(...questions.map(x => parseInt(x.id, 10))) + 1).toString();
  let {answer, hints, synonyms} = JSON.parse(event.body);

  await client.send(
    new PutItemCommand({
      TableName: TABLES.QUESTIONS,
      Item: {
        id: {S: id},
        answer: {S: answer},
        hints: {L: hints.map(x => ({S: x}))},
        synonyms: {L: synonyms.map(x => ({S: x}))},
      },
    }),
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
  };
};

module.exports.updateQuestion = async (event, context) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        error:
          'Missing body with fields: id :: string, answer :: string, hints :: string[], synonyms :: string[]',
      }),
    };
  }

  let {id, answer, hints, synonyms} = JSON.parse(event.body);

  await client.send(
    new PutItemCommand({
      TableName: TABLES.QUESTIONS,
      Item: {
        id: {S: id},
        answer: {S: answer},
        hints: {L: hints.map(x => ({S: x}))},
        synonyms: {L: synonyms.map(x => ({S: x}))},
      },
    }),
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
  };
};

module.exports.submitAnswer = async (event, context) => {
  const TableName = TABLES.ANSWER_HISTORY;
  const {deviceUuid, questionId, answer, timeTaken} = JSON.parse(
    event.body,
  );
  console.log('Processing ', deviceUuid);

  // Check if answer is correct
  const data = await ddbDocClient.send(
    new GetItemCommand({
      TableName: TABLES.QUESTIONS,
      Key: {
        id: questionId,
      },
    }),
  );

  if (!data.Item) {
    return errorResponse('Question not found');
  }

  const correctAnswer = data.Item.answer;
  const correct = correctAnswer.toLowerCase() === answer.toLowerCase();

  // Add answer to history
  await ddbDocClient.send(
    new PutItemCommand({
      TableName,
      Item: {
        uuid: uuid.v4(),
        deviceUuid,
        questionId,
        answer,
        numberOfTries,
        timeTaken,
        answeredAt: new Date().toISOString(),
        isCorrect: correct,
      },
    }),
  );

  return response(200, {
    correct,
    correctAnswer,
  });
};

// Get user's answer history
module.exports.answerHistory = async (event, context) => {
  const TableName = TABLES.ANSWER_HISTORY;
  const {deviceUuid} = JSON.parse(event.body);
  console.log('Processing ', deviceUuid);

  const data = await ddbDocClient.send(
    new ScanCommand({
      TableName,
      FilterExpression: 'deviceUuid = :val1',
      ExpressionAttributeValues: {
        ':val1': deviceUuid,
      },
    }),
  );

  return response(200, data.Items.map(item => ({
    questionId: item.questionId,
    answer: item.answer,
    numberOfTries: item.numberOfTries,
    timeTaken: item.timeTaken,
    answeredAt: item.answeredAt,
  })));
}

module.exports.getUserInfo = async (event, context) => {
  const {deviceUuid} = JSON.parse(event.body);
  const data = await getUserInfo(deviceUuid);

  const questions = await getAllQuestions();
  
  const answeredQuestions = await ddbDocClient.send(
    new ScanCommand({
      TableName: TABLES.ANSWER_HISTORY,
      FilterExpression: 'deviceUuid = :val1 and isCorrect = :val2',
      ExpressionAttributeValues: {
        ':val1': deviceUuid, 
        ':val2': true,
      },
    }),
  );

  const proportionAnswered = answeredQuestions.Items.length / questions.length;

  return response(200, {
    ...data,
    questions,
    answeredQuestions,
    proportionAnswered,
  });
};

module.exports.setUserInfo = async (event, context) => {
  const TableName = TABLES.USERS;
  const {deviceUuid, deviceToken, userName, password, isPremium, soundEnabled, darkTheme} = JSON.parse(
    event.body,
  );
  console.log('Processing ', deviceUuid);
  // Key to use for dyndb queries
  const Key = {
    deviceUuid: {S: deviceUuid},
  };

  // body must contain deviceUuid and deviceToken
  const existing = await client.send(
    new GetItemCommand({
      TableName,
      Key,
    }),
  );

  if (existing.Item) {
    // Item already exists, update it

    // If username is not set, set it
    if (!existing.Item.userName?.S && userName)
      await setLoginCreds(client, TableName, Key, userName, password);

    // If username is set, verify login
    // If password doesn't match, return error
    if (
      existing.Item.userName?.S &&
      hashPassword(password) !== existing.Item.password.S
    ) {
      return errorResponse('Incorrect password');
    }

    // Update item
    await ddbDocClient.send(
      new UpdateItemCommand({
        TableName,
        Key,
        UpdateExpression: 'set deviceToken = :val1',
        ExpressionAttributeValues: {
          ':val1': deviceToken,
        },
      }),
    );
  } else {
    // Item doesn't already exist

    // Create item
    await ddbDocClient.send(
      new PutItemCommand({
        TableName,
        Item: {
          deviceUuid,
          deviceToken,
          soundEnabled,
          darkTheme,
        },
      }),
    );

    // If username is present, set it
    if (userName)
      await setLoginCreds(client, TableName, Key, userName, password);
  }

  // If isPremium is present, set it
  if (isPremium) {
    await ddbDocClient.send(
      new UpdateItemCommand({
        TableName,
        Key,
        UpdateExpression: 'set isPremium = :val1',
        ExpressionAttributeValues: {
          ':val1': isPremium,
        },
      }),
    );
  }


  response(200, {});
};

function errorResponse(callback, message = 'An error occurred') {
  const response = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      error: true,
      message,
    }),
  };
  return response;
}

/**
 * Given a device and account creds, set them in the database
 * @param {DynamoDBClient} client
 * @param {string} TableName
 * @param {{deviceUuid: {S: string}}} Key
 * @param {string} userName
 * @param {string} password
 */
async function setLoginCreds(client, TableName, Key, userName, password) {
  await client.send(
    new UpdateItemCommand({
      TableName,
      Key,
      UpdateExpression: 'set userName = :val1, password = :val2',
      ExpressionAttributeValues: {
        ':val1': {
          S: userName,
        },
        ':val2': {
          S: hashPassword(password),
        },
      },
    }),
  );
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function getAllQuestions() {
  let data = await client.send(
    new ScanCommand({
      TableName: TABLES.QUESTIONS,
    }),
  );
  return data.Items.map(item => ({
    id: item.id.S,
    answer: item.answer.S,
    hints: item.hints.L.map(x => x.S),
    synonyms: item.synonyms.L.map(x => x.S),
  }));
}

async function getUserInfo(deviceUuid) {
  const TableName = TABLES.USERS;
  const Key = {
    deviceUuid: {S: deviceUuid},
  };
  const data = await client.send(
    new GetItemCommand({
      TableName,
      Key,
    }),
  );
  return {
    deviceUuid: data.Item.deviceUuid.S,
    deviceToken: data.Item.deviceToken.S,
    userName: data.Item.userName?.S,
    isPremium: data.Item.isPremium?.BOOL,
  };
}

// Please generate an OpenAPI 3.0 spec for this API and assign it to a variable named `openapiSpec`

module.exports.openapiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'GTC API',
    version: '1.0.0',
    description: 'API for the Guess The Code game',
  },
  paths: {
    '/validateWord': {
      post: {
        summary: 'Check if a word has a mapping',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  word: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    hasMapping: {
                      type: 'boolean',
                    },
                    mapping: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/validWords': {
      get: {
        summary: 'Get all valid words',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      word: {
                        type: 'string',
                      },
                      mapping: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/todaysQuestion': {
      get: {
        summary: "Get today's question",
        parameters: [
          {
            name: 'local_time',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              format: 'date-time',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    answer: {
                      type: 'string',
                    },
                    hints: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    synonyms: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/allQuestions': {
      get: {
        summary: 'Get all questions',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      answer: {
                        type: 'string',
                      },
                      hints: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      synonyms: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/addQuestion': {
      post: {
        summary: 'Add a question',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  answer: {
                    type: 'string',
                  },
                  hints: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  synonyms: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/updateQuestion': {
      post: {
        summary: 'Update a question',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  answer: {
                    type: 'string',
                  },
                  hints: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  synonyms: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/submitAnswer': {
      post: {
        summary: 'Submit an answer',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deviceUuid: {
                    type: 'string',
                  },
                  questionId: {
                    type: 'string',
                  },
                  answer: {
                    type: 'string',
                  },
                  numberOfTries: {
                    type: 'integer',
                  },
                  timeTaken: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    correct: {
                      type: 'boolean',
                    },
                    correctAnswer: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/answerHistory': {
      post: {
        summary: 'Get answer history',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deviceUuid: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      questionId: {
                        type: 'string',
                      },
                      answer: {
                        type: 'string',
                      },
                      numberOfTries: {
                        type: 'integer',
                      },
                      timeTaken: {
                        type: 'integer',
                      },
                      answeredAt: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/getUserInfo': {
      post: {
        summary: 'Get user info',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deviceUuid: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    deviceUuid: {
                      type: 'string',
                    },
                    deviceToken: {
                      type: 'string',
                    },
                    userName: {
                      type: 'string',
                    },
                    isPremium: {
                      type: 'boolean',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/setUserInfo': {
      post: {
        summary: 'Set user info',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deviceUuid: {
                    type: 'string',
                  },
                  deviceToken: {
                    type: 'string',
                  },
                  userName: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                  isPremium: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};