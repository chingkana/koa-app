const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-body");
const config = require("./config.json");
const app = new Koa();
const router = new Router();
const response = require("./app/helpers/response");

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error(`Error occurred while routing the request ${err}`);
        ctx.body = response.error(
            "Please be patient while we resolve the issue"
        );
    }
});

app.use(router.routes()).use(router.allowedMethods());

require("./app/router")(router);

app.listen(process.env.PORT || 3000);

process.on('uncaughtException', function (err) {
    console.error(`Error: ${err}`);
});