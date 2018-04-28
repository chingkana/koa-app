const config = require("../../config.json");
const response = require("../helpers/response");

class Test {
    static getInstance() {
        return new Test();
    }

    async test(data) {
        try {
            return response.success(data);
        } catch (err) {
            console.error("Error occurred in test", err);
            return response.error("Error occurred in test");
        }
    }
}
module.exports = Test;