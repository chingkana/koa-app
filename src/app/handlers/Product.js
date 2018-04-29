const config = require("../../config.json");
const response = require("../helpers/response");
const mongo = require("../helpers/mongo");

class Product {
    static getInstance() {
        return new Product();
    }

    async addProduct(data) {
        try {
            mongo.mongoConnect()
                .then(db => {
                    mongo.insert(db, data)
                        .then(result => {
                            console.log("result", result);
                        })
                        .catch(err => response.error(err));
                    db.close();
                })
                .catch(err => response.error(err));
        } catch (err) {
            console.error("Error occurred in product", err);
            return response.error("Error occurred in product");
        }
        return response.success("Added the record successfully!!");
    }

    async updateProduct(_id, value) {
        try {
            mongo.mongoConnect()
                .then(db => {
                    let pushOrSet = {
                        $set: value
                    };
                    mongo.update(db, { _id }, pushOrSet)
                        .then(result => {
                            console.log("result", result.result.nModified);
                        })
                        .catch(err => response.error(err));
                    db.close();
                })
                .catch(err => response.error(err));
        } catch (err) {
            console.error("Error occurred in product", err);
            return response.error("Error occurred in product");
        }
        return response.success("Updated the record successfully!!");
    }
}
module.exports = Product;