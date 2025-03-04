'use strict';
const {
  DynamoDBClient,
  ListTablesCommand,
  QueryCommand,
  TransactWriteItemsCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
  GetItemCommand,
} = require('@aws-sdk/client-dynamodb');
const fs = require('fs');
const {parse} = require('csv-parse/sync');

const TABLENAME_SYNONYMS = 'gtc.synonyms';
const TABLENAME_QUESTIONS = 'test_gtc_questions';
const CSV_FILE = process.argv[2] || './questions.csv';

console.log('Uploading file ' + CSV_FILE);

const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: JSON.parse(fs.readFileSync('./creds.json').toString()),
});

async function setQuestion(id, answer, hints, synonyms) {
  console.log(`Uploading question ${id}: ${answer}`);
  await client.send(
    new UpdateItemCommand({
      TableName: TABLENAME_QUESTIONS,
      Key: {
        id: {
          S: id,
        },
      },
      UpdateExpression: 'set answer = :val1, hints = :val2, synonyms = :val3',
      ExpressionAttributeValues: {
        ':val1': {
          S: answer,
        },
        ':val2': {
          L: hints.map(x => ({S: x})),
        },
        ':val3': {
          L: synonyms.map(x => ({S: x})),
        },
      },
    }),
  );
}

async function setSynonym(answer, synonym) {
  const record = await client.send(
    new GetItemCommand({
      TableName: TABLENAME_SYNONYMS,
      Key: {
        word: {
          S: synonym,
        },
      },
    }),
  );

  if (record.Item && record.Item.mapping.S !== answer) {
    // Synonym conflict!!
    throw Error(
      `Synonym conflict! Mapping ${synonym} to ${answer} but existing maps to ${record.Item.mapping.S}`,
    );
  }

  if (record.Item && record.Item.mapping.S === answer) {
    return;
  }

  await client.send(
    new PutItemCommand({
      TableName: TABLENAME_SYNONYMS,
      Item: {
        word: {
          S: synonym,
        },
        mapping: {
          S: answer,
        },
      },
    }),
  );
}

/**
 * Parsed records from csv file
 * @type {Array[]}
 */
const records = parse(fs.readFileSync(CSV_FILE), {
  skip_empty_lines: true,
  from: 2,
});

// console.log(records);
// return;

for (let question of records) {
  let synonyms = question.slice(7).filter(x => x);
  let id = question[0];
  let answer = question[1];
  let hints = question.slice(2, 7).filter(x => x);
  setQuestion(id, answer, hints, synonyms);

  for (let syn of synonyms) setSynonym(answer, syn);
}
