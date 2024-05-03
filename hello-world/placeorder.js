const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

exports.placeOrder = async (event) => {
    const requestBody = JSON.parse(event.body);

    if (!requestBody) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "No Request payload"}),
        };
    }

    const orderId = uuid.v4();
    const userId = requestBody.user_id;
    const orderStatus = "ORDERED";
    const orderTotal = requestBody.order_total;
    const orderItems = requestBody.order_items;

    const item = {
        "PK": "ORDER",
        "SK": `ORDER#${orderId}`,
        "GSI1PK": `USER#${userId}`,
        "GSI1SK": `ORDER#${orderId}`,
        "userId": userId,
        "orderId": orderId,
        "orderStatus": orderStatus,
        "orderDate": new Date().toISOString(),
        "orderTotal": orderTotal,
        "orderItems": orderItems,
    };

    const params = {
        TableName: 'product-ProductTable-10KRR92B0DTB6', // update this with your table name
        Item: item
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({message: "Order placed successfully"}),
        };
    } catch (err) {
        console.debug(`Failed to place order ${err.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({message: `Failed to place order ${err.message}`}),
        };
    }
};