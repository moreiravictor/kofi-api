import { GetLatestPostsController } from "@/application/controllers";
import { GetLatestPostsUseCase } from "@/application/usecases";
import db from "@/main/common/postgres/client";
import { PostRepository } from "@/main/repositories/postgres/post";

export function makeGetLatestPostsController(): GetLatestPostsController {
  return new GetLatestPostsController(new GetLatestPostsUseCase(new PostRepository(db)));
}