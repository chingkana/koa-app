const config = require("../../config.json");
const response = require("../helpers/response");
const mongo = require("../helpers/mongo");

class Product {
    static getInstance() {
        return new Product();
    }

    async addProduct(data) {
        try {
            const [
                _id,
                name,
                size,
                category_id,
                sub_category
            ] = [
                    data["_id"],
                    data["name"],
                    data["size"],
                    data["category_id"],
                    data["sub_category"]
                ];
            let client = await mongo.mongoConnect();
            await mongo.insert(client, "products", { _id, name, size, "timestamp": new Date() });
            let elementKey = `sub_categories.${sub_category}`;
            let pushOrSet = {
                $push: {
                    [elementKey]: _id
                }
            };

            let updateStatus = await mongo.update(client, "categories", { "_id": category_id, [elementKey]: { $exists: true } }, pushOrSet);

            if (updateStatus.result.nModified) {
                return response.success("Added the product successfully!!. Also mapped the product to Sub category");
            }
            else {
                return response.success(`Added the product successfully, but ${sub_category} does not exists. Hence unable to map product with Sub category ${sub_category}.`);
            }
        } catch (err) {
            return response.error(`Error occurred in product ${err}`);
        }
    }

    async updateProduct(_id, value) {
        try {
            let client = await mongo.mongoConnect();
            let pushOrSet = {
                $set: value
            };
            let updateStatus = await mongo.update(client, "products", { _id }, pushOrSet);

            if (updateStatus.result.nModified) {
                return response.success("Updated the product successfully!!");
            }
            else {
                return response.success("Unable to update the record. Either the product does not exist or the product details are unchanged");
            }
        } catch (err) {
            return response.error(`Error occurred in product ${err}`);
        }
        return response.success("Updated the record successfully!!");
    }
}
module.exports = Product;