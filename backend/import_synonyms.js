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

const TABLENAME_SYNONYMS = 'test_gtc_validwords';
const CSV_FILE = process.argv[2] || './synonyms.csv';

console.log('Uploading file ' + CSV_FILE);

const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: JSON.parse(fs.readFileSync('./creds.json').toString()),
});

const records = parse(fs.readFileSync(CSV_FILE), {
  skip_empty_lines: true,
  from: 1,
});

(async () => {
  for (let entry of records) {
    let name = entry[0];
    let syn1 = entry[1];
    let syn2 = entry[2];
    let syn3 = entry[3];

    await setSynonym(name, name);

    for (let syn of [syn1, syn2, syn3]) {
      if (syn) {
        await setSynonym(name, syn);
      }
    }
  }
})();

async function setSynonym(answer, synonym) {
  synonym = synonym.toLowerCase();
  answer = answer.toLowerCase();
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

  if (record.Item && record.Item.mapping.S.toLowerCase() !== answer) {
    // Synonym conflict!!
    return console.log(
      Error(
        `Synonym conflict! Mapping ${synonym} to ${answer} but existing maps to ${record.Item.mapping.S}`,
      ),
    );
  }

  if (record.Item && record.Item.mapping.S.toLowerCase() === answer) {
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

  console.log(`Updated ${synonym} ${answer}`);
}
