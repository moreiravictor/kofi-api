import { CommentOnPostRequest } from "@/application/contracts/requests";
import { PostType } from "@/domain/models/post";
import { makeComentOnPostController } from "@/main/factories/controllers/posts/comment-on-post";
import { makeCreatePostController } from "@/main/factories/controllers/posts/create-post";
import { makeGetLatestPostsController } from "@/main/factories/controllers/posts/get-latest-posts";
import { makeGetPostByIdController } from "@/main/factories/controllers/posts/get-post-by-id";
import { makeGetUserPostsController } from "@/main/factories/controllers/posts/get-user-posts";
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

postRouter.get("/posts/user/:userId", async (ctx) => {
  const userId = ctx.params.userId;

  const response = await makeGetUserPostsController().control({ userId });

  ctx.body = response;
});

postRouter.get("/posts/:postId", async (ctx) => {
  const postId = ctx.params.postId;

  const response = await makeGetPostByIdController().control({ postId });

  ctx.body = response;
});

postRouter.post("/posts/comment/:postId", async (ctx) => {
  const postId = ctx.params.postId;

  const body = ctx.request.body as Pick<
    CommentOnPostRequest,
    "content" | "userId"
  >;

  const response = await makeComentOnPostController().control({
    postId,
    ...body,
  });

  ctx.body = response;
});

export default postRouter.routes();
