const AWS = require('aws-sdk');
const XRay = require('aws-xray-sdk-core');
const log = require('lambda-log');

AWS.config.logger = log.log;

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'productevent-ProductTable-19Q01SO90P4MU';

const captureRecordHandler = XRay.captureAsyncFunc('recordHandler', async (subsegment, record) => {
  const payload = JSON.parse(record.body);
  if (payload) {
    log.debug(payload);
    log.debug(`product id ${payload.productId}`);
    const params = {
      TableName: tableName,
      Key: {
        "PK": `USER#test@gmail.com`,
        "SK": `PRODUCT#${payload.productId}`
      },
      ConditionExpression: "attribute_exists(PK)",
      UpdateExpression: "set cart_product_status= :productStatus",
      ExpressionAttributeValues: {
        ":productStatus": "ORDERED"
      },
      ReturnValues: "ALL_NEW"
    };
    const response = await dynamoDB.update(params).promise();
    log.debug({ "update response": response.Attributes });
  }
  subsegment.close();
}, log.log);

exports.handler = XRay.captureAsyncFunc('lambdaHandler', async (subsegment, event, context) => {
  for (const record of event.Records) {
    await captureRecordHandler(record);
  }
  subsegment.close();
}, log.log);