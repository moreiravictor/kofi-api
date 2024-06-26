import { CreatePostController } from "@/application/controllers/post/create-post";
import { CreatePostUseCase } from "@/application/usecases";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { PostRepository } from "@/main/repositories/postgres/post";
import { createPostValidator } from "@/main/validators/create-post";

export function makeCreatePostController() {
  return new CreatePostController(
    new CreatePostUseCase(new PostRepository(db)),
    new JoiValidator(createPostValidator)
  );
}
