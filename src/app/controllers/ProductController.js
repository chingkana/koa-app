const Product = require("../handlers/Product");
const response = require("../helpers/response");

module.exports.product = async ctx => {
    const data = ctx.request.body;
    const [
        id,
        name,
        size
    ] = [
            data["_id"],
            data["name"],
            data["size"]
        ];

    if (!id || id.trim() === "") {
        console.error("id cannot be empty");
        ctx.body = response.error("id cannot be empty");
        return;
    }

    if (!name || name.trim() === "") {
        console.error("name cannot be empty");
        ctx.body = response.error("name cannot be empty");
        return;
    }

    if (typeof size === Array) {
        console.error("size cannot be empty");
        ctx.body = response.error("size cannot be empty");
        return;
    }

    ctx.body = await Product.getInstance().addProduct(data);
};

module.exports.updateProduct = async ctx => {
    ctx.body = await Product.getInstance().updateProduct(ctx.params.id, ctx.request.body);
}
