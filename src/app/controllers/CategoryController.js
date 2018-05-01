const Category = require("../handlers/Category");
const response = require("../helpers/response")

module.exports.getData = async ctx => {
    ctx.body = await Category.getInstance().getCategory();
};

module.exports.addCategory = async ctx => {
    const data = ctx.request.body;
    const [
        id,
        name
    ] = [
            data["_id"],
            data["name"]
        ];

    if (!id || id.trim() === "") {
        ctx.body = response.error("id cannot be empty");
        return;
    }

    if (!name || name.trim() === "") {
        ctx.body = response.error("name cannot be empty");
        return;
    }

    ctx.body = await Category.getInstance().addCategory(data);
};