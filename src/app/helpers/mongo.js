const MongoClient = require('mongodb').MongoClient;
const config = require("../../../src/config.json");
const url = config.url || "mongodb://localhost:27017";

function mongoConnect(callback) {
    try {
        MongoClient.connect(url, (mongoErr, mongoConnection) => {
            if (mongoErr) {
                console.error("Failed to establish a connection with mongodb: ", mongoErr);
                callback(mongoErr, null);
            } else {
                callback(null, mongoConnection);
            }
        });
    }
    catch (objEx) {
        callback("Failed to establish a connection with mongodb:. Error: " + objEx, null);
    }
}

function find(client, query, callback) {
    try {
        const db = client.db('test');
        db.collection('categories').find({}).toArray((findErr, resultSet) => {
            if (findErr) {
                console.error("Operation failed while fetching the data from mongodb: ", findErr);
                callback(findErr, null);
            } else {
                callback(null, resultSet);
            }
        });
    }
    catch (objEx) {
        callback("Operation failed while fetching the data from mongodb. Error: " + objEx, null);
    }
}

module.exports = {
    mongoConnect: mongoConnect,
    find: find
};