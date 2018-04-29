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
            mongo.mongoConnect()
                .then(db => {
                    mongo.find(db, {})
                        .then(result => {
                            console.log("result", result);
                            this.res = result;
                        })
                        .catch(err => response.error(err));
                    db.close();
                })
                .catch(err => response.error(err));
        } catch (err) {
            console.error("Error occurred in category", err);
            return response.error("Error occurred in category");
        }
        return response.success(res);
    }
}
module.exports = Category;