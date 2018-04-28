module.exports = async (ctx, next) => {
    if (
      (ctx.method != "GET" &&
        ctx.request.header["content-type"] ===
          "application/json; charset=utf-8") ||
      ctx.request.get("content-Type") === "application/json"
    ) {
      await next();
    } else {
      throw new Error("In Appropriate Content Type");
    }
  };
  