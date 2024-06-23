import { makeLoginController } from "@/main/factories/controllers/user/login";
import { makeRegisterUserController } from "@/main/factories/controllers/user/register";
import { makeUpdateUserController } from "@/main/factories/controllers/user/update-user";
import Router from "koa-router";

const userRouter = new Router({prefix: "/users", });

userRouter.post("/login", async (ctx) => {
  const data = ctx.request.body;

  const response = await makeLoginController().control(data);

  ctx.body = response;
});

userRouter.post("/register", async (ctx) => {
  const data = ctx.request.body;

  const response = await makeRegisterUserController().control(data);

  ctx.body = response;
});

userRouter.post("/update/:id", async (ctx) => {
  const data = ctx.request.body;
  const userId = ctx.params.id;

  const response = await makeUpdateUserController().control({ id: userId, ...data });

  ctx.body = response;
});

export default userRouter.routes();
