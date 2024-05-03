const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.getProducts = async () => {
    const params = {
        TableName: 'product-ProductTable-10KRR92B0DTB6', // update this with your table name
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        ExpressionAttributeValues: {
            ":pk": "PRODUCT",
            ":sk": "PRODUCT#"
        }
    };

    let results = [];
    let items;
    do {
        items = await dynamoDB.query(params).promise();
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    } while(typeof items.LastEvaluatedKey != "undefined");

    console.info(`fetch_all_products returned ${results}`);
    return {
        statusCode: 200,
        body: JSON.stringify({products: results, total: results.length}),
    };
};