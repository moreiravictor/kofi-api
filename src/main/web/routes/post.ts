import { PostType } from "@/domain/models/post";
import { makeGetLatestPostsController } from "@/main/factories/controllers/posts/get-latest-posts";
import Router from "koa-router";

const postRouter = new Router();

postRouter.get("/posts/latest/:type", async (ctx) => {
  const type = ctx.params.type;

  console.log(type);

  const response = await makeGetLatestPostsController().control(type as PostType);

  ctx.body = response;
});

export default postRouter.routes();
