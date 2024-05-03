// getProducts.test.js
const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');
const { getProducts } = require('../../../getallproducts.js');

// Set the region
AWS.config.update({region: 'us-west-2'}); // replace 'us-west-2' with your region

describe('getProducts', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should return all products', async () => {
    const mockItems = [
      { PK: 'PRODUCT', SK: 'PRODUCT#1', name: 'Product 1' },
      { PK: 'PRODUCT', SK: 'PRODUCT#2', name: 'Product 2' },
    ];

    AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
      callback(null, { Items: mockItems, LastEvaluatedKey: undefined });
    });

    const response = await getProducts();
    const body = JSON.parse(response.body);

    expect(response.statusCode).toEqual(200);
    expect(body.products).toEqual(mockItems);
    expect(body.total).toEqual(mockItems.length);
  });
});