const config = require("../../config.json");
const response = require("../helpers/response");
const mongo = require("../helpers/mongo");

class Product {
    static getInstance() {
        return new Product();
    }

    async addProduct(data) {
        try {
            let client = await mongo.mongoConnect();
            await mongo.insert(client, data);
        } catch (err) {
            console.error("Error occurred in product", err);
            return response.error(`Error occurred in product ${err}`);
        }
        return response.success("Added the record successfully!!");
    }

    async updateProduct(_id, value) {
        try {
            let client = await mongo.mongoConnect();
            let pushOrSet = {
                $set: value
            };
            await mongo.update(client, { _id }, pushOrSet);
        } catch (err) {
            console.error("Error occurred in product", err);
            return response.error(`Error occurred in product ${err}`);
        }
        return response.success("Updated the record successfully!!");
    }
}
module.exports = Product;