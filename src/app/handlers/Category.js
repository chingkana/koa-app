const config = require("../../config.json");
const response = require("../helpers/response");
const mongo = require("../helpers/mongo");

class Category {
    static getInstance() {
        return new Category();
    }

    async getCategory() {
        let res = [];
        try {
            let client = await mongo.mongoConnect();
            res = await mongo.find(client, "categories", {});
        } catch (err) {
            return response.error(`Error occurred in category${err}`);
        }
        return response.success("success", res);
    }

    async addCategory(data) {
        try {
            let client = await mongo.mongoConnect();
            await mongo.insert(client, "categories", data);
        } catch (err) {
            return response.error(`Error occurred in category ${err}`);
        }
        return response.success("Added the record successfully!!");
    }
}
module.exports = Category;