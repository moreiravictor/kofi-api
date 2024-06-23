import { errorMiddleware } from "@/main/common/koa/error-middleware";
import postRoutes from "@/main/web/routes/post";
import userRoutes from "@/main/web/routes/user";
import { bodyParser } from "@koa/bodyparser";
import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.use(userRoutes, postRoutes);

app
  .use(errorMiddleware)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.APP_PORT);

console.log(`app is running on port ${process.env.APP_PORT}`);

export default router;