const Product = require("../handlers/Product");
const response = require("../helpers/response");

module.exports.product = async ctx => {
    const data = ctx.request.body;
    const [
        id,
        name,
        size,
        category_id,
        sub_category,
    ] = [
            data["_id"],
            data["name"],
            data["size"],
            data["category_id"],
            data["sub_category"]
        ];

    if (!id || id.trim() === "") {
        ctx.body = response.error("id cannot be empty");
        return;
    }

    if (!name || name.trim() === "") {
        ctx.body = response.error("name cannot be empty");
        return;
    }

    if (typeof size === Array) {
        ctx.body = response.error("size cannot be empty");
        return;
    }

    if (!category_id || category_id.trim === "") {
        ctx.body = response.error("category_id cannot be empty");
        return;
    }

    if (!sub_category || sub_category.trim === "") {
        ctx.body = response.error("sub_category cannot be empty");
        return;
    }

    ctx.body = await Product.getInstance().addProduct(data);
};

module.exports.updateProduct = async ctx => {
    ctx.body = await Product.getInstance().updateProduct(ctx.params.id, ctx.request.body);
}
