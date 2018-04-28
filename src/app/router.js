const TestController = require("./controllers/TestController");
const CategoryController = require("./controllers/CategoryController");
const cTypeJSON = require("./middlewares/cTypeJSON");

module.exports = router => {

    router.get("/", async ctx => {
        ctx.body = {
            health: "ok"
        };
    });

    router.get("/categories", CategoryController.getData);
    
    router.post("/test", cTypeJSON, TestController.test);
    
};
