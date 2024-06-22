import { makeLoginController } from "@/main/factories/controllers/login";
import Router from "koa-router";

const loginRouter = new Router();

loginRouter.post("/users/login", async (ctx) => {
  const data = ctx.request.body;

  const response = await makeLoginController().control({ type: "internal", data });

  ctx.body = response;
});

export default loginRouter.routes();
