import { PostType } from "@/domain/models/post";
import { makeCreatePostController } from "@/main/factories/controllers/posts/create-post";
import { makeGetLatestPostsController } from "@/main/factories/controllers/posts/get-latest-posts";
import Router from "koa-router";

const postRouter = new Router();

postRouter.get("/posts/latest", async (ctx) => {
  const { page, limit, type } = ctx.query;

  const response = await makeGetLatestPostsController().control({
    limit: limit ? Number(limit) : undefined,
    page: page ? Number(page) : undefined,
    type: type ? (type as PostType) : undefined,
  });

  ctx.body = response;
});

postRouter.post("/posts", async (ctx) => {
  const request = ctx.request.body;

  const response = await makeCreatePostController().control(request);

  ctx.body = response;
});

export default postRouter.routes();
