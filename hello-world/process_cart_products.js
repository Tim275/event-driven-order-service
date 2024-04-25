const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'}); // Update this with your region
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const sqsQueueUrl = 'https://sqs.eu-central-1.amazonaws.com/506820257931/product-UpdateCartProductsSQS-gigk8mFysWGX'; // Update this with your queue URL

exports.handler = async (event) => {
    // Multiple records can be delivered in a single event
    for (const record of event.Records) {
        if (record.eventName === 'INSERT') {
            
            console.log(`New record detected. Event ID: ${record.eventID}`);
            console.log(`New record detected: ${JSON.stringify(record.dynamodb.NewImage)}`);

            const orderItems = record.dynamodb.NewImage.order_items.SS; // Update this if your order_items attribute is not a string set

            for (const orderItem of orderItems) {
                console.log(`Sending message to SQS Queue: ${orderItem}`);

                // send message to sqs queue
                await sendSqsMessage(orderItem);
            }
        }
    }
};

async function sendSqsMessage(orderItem) {
    const params = {
        MessageBody: orderItem,
        QueueUrl: sqsQueueUrl
    };

    try {
        const data = await sqs.sendMessage(params).promise();
        console.log(`Sent message to SQS Queue: ${sqsQueueUrl}. Message ID: ${data.MessageId}`);
    } catch (err) {
        console.error('Error', err);
    }
}