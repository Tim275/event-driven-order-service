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

it('should return 500 when there is an error', async () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'batchWrite', Promise.reject(new Error('some error happened')));

    try {
        await loadProducts();
    } catch (err) {
        expect(err.message).toEqual('some error happened');
    }
});

}); 