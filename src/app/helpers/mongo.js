const MongoClient = require('mongodb').MongoClient;
const config = require("../../../src/config.json");
const url = config.url || "mongodb://localhost:27017";

function mongoConnect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (mongoErr, mongoConnection) => {
            if (mongoErr) {
                console.error("Failed to establish a connection with mongodb: ", mongoErr);
                reject(mongoErr);
            } else {
                console.log("Connection established!!");
                resolve(mongoConnection);
            }
        });
    });
}

function find(client, query) {
    return new Promise((resolve, reject) => {
        const db = client.db('test');
        db.collection('categories').find({}).toArray((findErr, resultSet) => {
            if (findErr) {
                console.error("Operation failed while fetching the data from mongodb: ", findErr);
                reject(findErr);
            } else {
                resolve(resultSet);
            }
        });
    });
}

function insert(client, document) {
    return new Promise((resolve, reject) => {
        const db = client.db('test');
        db.collection('products').insert(document, { w: 1 }, (insertErr, result) => {
            if (insertErr) {
                console.error("Operation failed while dumping into mongo");
                reject(insertErr);
            } else {
                resolve(result);
            }
        });
    });
}

function update(client, query, pushOrSet) {
    return new Promise((resolve, reject) => {
        const db = client.db('test');
        db.collection('products').update(query, pushOrSet, (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Operation failed while Updating the data in mongodb");
                reject(updateErr);
            } else {
                resolve(updateResult);
            }
        });
    });
}

module.exports = {
    mongoConnect: mongoConnect,
    find: find,
    insert: insert,
    update: update
};