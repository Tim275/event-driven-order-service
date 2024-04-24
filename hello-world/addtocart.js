const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.addToCart = async (event) => {
    const userId = event.pathParameters.user_id;
    const requestBody = JSON.parse(event.body);

    if (!requestBody) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "No Request payload"}),
        };
    }

    const productId = requestBody.product_id;
    const quantity = requestBody.quantity;

    const item = {
        "PK": `USER#${userId}`,
        "SK": `PRODUCT#${productId}`,
        "userId": userId,
        "productId": productId,
        "quantity": quantity,
        "cartProductStatus": "PENDING",
        "addedOn": new Date().toISOString(),
    };

    const params = {
        TableName: 'productevent-ProductTable-19Q01SO90P4MU', // update this with your table name
        Item: item
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({productId: productId, message: "product added to cart"}),
        };
    } catch (err) {
        console.debug(`Failed to add item to cart ${err.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({message: `Failed to add item to cart ${err.message}`}),
        };
    }
};