import AWS from 'aws-sdk';
//import product_list from './product_list.json' assert { type: 'json' };
import product_list from './product_list.json';


const dynamoDB = new AWS.DynamoDB.DocumentClient();


/*
export const loadProducts = async (event) => {
    const params = {
        RequestItems: {
            "product-ProductTable-10KRR92B0DTB6": product_list.body.products.map(item => ({
                PutRequest: {
                    Item: {
                        PK: item.PK,
                        SK: item.SK,
                        productId: item.productId,
                        category: item.category,
                        createdDate: item.createdDate,
                        description: item.description,
                        modifiedDate: item.modifiedDate,
                        name: item.name,
                        package: JSON.stringify(item.package), 
                        pictures: item.pictures.join(", "), 
                        tags: item.tags.join(", ") 
                    }
                }
            }))
        }
    };

    try {
        await dynamoDB.batchWrite(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'uploaded successfully',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
            }),
        };
    }
};
*/

export const loadProducts = async (event) => {
    const params = {
        RequestItems: {
            "product-ProductTable-10KRR92B0DTB6": product_list.body.products.map(item => ({
                PutRequest: {
                    Item: {
                        PK: item.PK,
                        SK: item.SK,
                        productId: item.productId,
                        category: item.category,
                        createdDate: item.createdDate,
                        description: item.description,
                        modifiedDate: item.modifiedDate,
                        name: item.name,
                        package: JSON.stringify(item.package), 
                        pictures: item.pictures.join(", "), 
                        tags: item.tags.join(", ") 
                    }
                }
            }))
        }
    };

    try {
        await dynamoDB.batchWrite(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'uploaded successfully',
            }),
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};
};