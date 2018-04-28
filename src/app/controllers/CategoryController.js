const Category = require("../handlers/Category");

exports.getData = async ctx => {
    ctx.body = await Category.getInstance().getCategory();
};
