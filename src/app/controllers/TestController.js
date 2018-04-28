const Test = require("../handlers/Test");
const response = require("../helpers/response");

exports.test = async ctx => {
    const data = ctx.request.body;
    const [
        foo1,
        foo2,
        foo3
    ] = [
            data["foo1"],
            data["foo2"],
            data["foo3"]
        ];

    if (!foo1 || foo1.trim() === "") {
        console.error("foo1 cannot be empty");
        ctx.body = response.error("foo1 cannot be empty");
        return;
    }

    if (!foo2 || foo2.trim() === "") {
        console.error("foo2 cannot be empty");
        ctx.body = response.error("foo2 cannot be empty");
        return;
    }

    if (!foo3 || foo3.trim() === "") {
        console.error("foo3 cannot be empty");
        ctx.body = response.error("foo3 cannot be empty");
        return;
    }

    ctx.body = await Test.getInstance().test(data);
};
