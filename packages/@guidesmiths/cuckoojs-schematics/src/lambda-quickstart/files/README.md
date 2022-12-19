# <%= serviceName %>

## Getting started

1. Run `npm i`
2. Ensure `serverless` is installed globally

## Local development

In order to test it locally:
1. Setup local infra: `npm run infra:up`
2. Create your `.env` file based on the `.env.sample` file
3. run `FUNCTION=functionName INPUT=fixtureName npm run invoke:local`

## Test

1. Run `npm run test`
