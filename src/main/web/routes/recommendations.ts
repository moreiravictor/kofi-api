import { makeGetTopRecommendationsController } from "@/main/factories/controllers/recommendations/get-top-recommendations";
import Router from "koa-router";

const recommendationsRouter = new Router();

recommendationsRouter.get("/recommendations", async (ctx) => {
  const response = await makeGetTopRecommendationsController().control();

  ctx.body = response;
});

export default recommendationsRouter.routes();
