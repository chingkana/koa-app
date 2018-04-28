const config = require("../../config.json");
const response = require("../helpers/response");
const mongo = require("../helpers/mongo");

class Category {
    static getInstance() {
        return new Category();
    }

    async getCategory() {
        try {
            let result = [];
            mongo.mongoConnect((err, db) => {
                if (err) {
                    console.error(err);
                } else {
                    mongo.find(db, {}, (err, resultSet) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(resultSet);
                            result = resultSet;
                            console.log(result);
                        }
                    });
                }
                db.close();
            });
            return response.success(result);
        } catch (err) {
            console.error("Error occurred in category", err);
            return response.error("Error occurred in category");
        }
    }
}
module.exports = Category;