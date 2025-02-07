import { GetLatestPostsController } from "@/application/controllers";
import { GetLatestPostsUseCase } from "@/application/usecases";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { PostRepository } from "@/main/repositories/postgres/post";
import { GetLatestPostsValidator } from "@/main/validators/get-latest-posts";

export function makeGetLatestPostsController(): GetLatestPostsController {
  return new GetLatestPostsController(
    new GetLatestPostsUseCase(new PostRepository(db)),
    new JoiValidator(GetLatestPostsValidator)
  );
}
