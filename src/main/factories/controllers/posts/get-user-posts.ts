import { GetUserPostsController } from "@/application/controllers/post/get-user-posts";
import { GetUserPostsUseCase } from "@/application/usecases/post/get-user-posts";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { PostRepository } from "@/main/repositories/postgres/post";
import { GetUserPostsValidator } from "@/main/validators/get-user-posts";

export function makeGetUserPostsController(): GetUserPostsController {
  return new GetUserPostsController(
    new GetUserPostsUseCase(new PostRepository(db)),
    new JoiValidator(GetUserPostsValidator)
  );
}
