import loginRoutes from "@/main/web/routes/login";
import { bodyParser } from "@koa/bodyparser";
import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.use(loginRoutes);

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT);

console.log(`app is running on port ${process.env.APP_PORT}`);

export default router;