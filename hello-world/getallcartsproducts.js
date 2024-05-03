const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.getCart = async (event) => {
    const userId = event.pathParameters.user_id;

    const params = {
        TableName: 'product-ProductTable-10KRR92B0DTB6', // update this with your table name
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        ProjectionExpression: "productId,quantity,cartProductStatus,addedOn,userId",
        FilterExpression: "cartProductStatus = :status",
        ExpressionAttributeValues: {
            ":pk": `USER#${userId}`,
            ":sk": "PRODUCT#",
            ":status": "PENDING"
        }
    };

    try {
        const response = await dynamoDB.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({cart_items: response.Items}),
        };
    } catch (err) {
        console.debug(`Failed to get cart ${err.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({message: `Failed to get cart ${err.message}`}),
        };
    }
};