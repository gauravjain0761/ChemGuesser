# GTC Backend

# Set up

Run `npm install`

## Uploading questions

Update questions in `question.csv`, then run `npm run import_questions.js` or `node import_questions.csv`

## Uploading synonyms

Update synonyms in `synonyms.csv`, then run `npm run import_synonyms.js` or `node import_synonyms.js`

## Deploying

Run `serverless deploy`. You might need to change the org name if you don't have permissions to the one in `serverless.yml`, and to rebuild the app with the new API path.