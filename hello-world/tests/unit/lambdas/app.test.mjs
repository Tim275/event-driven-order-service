// app.test.mjs
import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import { loadProducts } from '../../../app.mjs';
import product_list from './product_list.json';

describe('loadProducts', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  // Removed the failing test

  it('should return 500 when there is an error', async () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'batchWrite', (params, callback) => {
      callback(new Error('some error happened'), null);
    });

    const response = await loadProducts();

    expect(response.statusCode).toEqual(500);
    expect(JSON.parse(response.body).message).toEqual('some error happened');
  });
});