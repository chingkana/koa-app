const CategoryController = require("./controllers/CategoryController");
const ProductController = require("./controllers/ProductController");
const cTypeJSON = require("./middlewares/cTypeJSON");

module.exports = router => {

    router.get("/", async ctx => {
        ctx.body = {
            health: "ok"
        };
    });

    router.get("/categories", CategoryController.getData);
    router.post("/category", cTypeJSON, CategoryController.addCategory);

    router.post("/product", cTypeJSON, ProductController.product);
    router.patch("/product/:id", cTypeJSON, ProductController.updateProduct);
    
};
