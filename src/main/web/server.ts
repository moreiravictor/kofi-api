import { APP_PORT } from "@/application/contracts/env";
import { errorMiddleware } from "@/main/common/koa/error-middleware";
import postRoutes from "@/main/web/routes/post";
import userRoutes from "@/main/web/routes/user";
import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.use(userRoutes, postRoutes);

app
  .use(errorMiddleware)
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(APP_PORT);

console.log(`app is running on port ${APP_PORT}`);

export default router;
