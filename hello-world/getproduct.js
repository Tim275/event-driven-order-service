const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.getProduct = async (event) => {
    const productId = event.pathParameters.product_id;
    console.debug(`Product id ${productId}`);

    try {
        const params = {
            TableName: 'product-ProductTable-10KRR92B0DTB6', // update this with your table name
            Key: {
                "PK": "PRODUCT",
                "SK": `PRODUCT#${productId}`
            }
        };

        const data = await dynamoDB.get(params).promise();  // Change this from dynamodb to dynamoDB

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (err) {
        console.debug(`Error while getting product ${err.message}`);
        throw err;
    }
};