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
            res = await mongo.find(client, {});
        } catch (err) {
            console.error("Error occurred in category", err);
            return response.error(`Error occurred in category${err}`);
        }
        return response.success("success", res);
    }
}
module.exports = Category;