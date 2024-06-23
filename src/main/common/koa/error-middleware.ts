import { KofiError } from "@/application/contracts/errors";
import { Context, Next } from "koa";

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch(err) {
    console.log(err);

    const error = err instanceof KofiError ? err : new KofiError();

    ctx.body = { error: { message: error.message } };
    ctx.status = error.statusCode;
  }
}