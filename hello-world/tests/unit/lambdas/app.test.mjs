// app.test.mjs
import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import { loadProducts } from '../../../app.mjs';

describe('loadProducts', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should return 200 when products are loaded successfully', async () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'batchWrite', () => {
      return Promise.resolve({});
    });

    const response = await loadProducts();
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).message).toEqual('uploaded successfully');
  });

  it('should return 500 when there is an error', async () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'batchWrite', () => {
      return Promise.reject(new Error('some error happened'));
    });

    const response = await loadProducts();
    expect(response.statusCode).toEqual(500);
    expect(JSON.parse(response.body).message).toEqual('some error happened');
  });
});