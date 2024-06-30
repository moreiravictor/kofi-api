import { PostType } from "@/domain/models/post";
import { makeCreatePostController } from "@/main/factories/controllers/posts/create-post";
import { makeGetLatestPostsController } from "@/main/factories/controllers/posts/get-latest-posts";
import Router from "koa-router";

const postRouter = new Router();

postRouter.get("/posts/latest/:type", async (ctx) => {
  const type = ctx.params.type;

  console.log(type);

  const response = await makeGetLatestPostsController().control(
    type as PostType
  );

  ctx.body = response;
});

postRouter.post("/posts", async (ctx) => {
  const request = ctx.request.body;

  const response = await makeCreatePostController().control(request);

  ctx.body = response;
});

export default postRouter.routes();
