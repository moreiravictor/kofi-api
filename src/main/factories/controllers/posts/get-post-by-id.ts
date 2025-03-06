import { GetPostByIdController } from "@/application/controllers/post/get-post-by-id";
import { GetPostByIdUseCase } from "@/application/usecases/post/get-post-by-id";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { PostRepository } from "@/main/repositories/postgres/post";
import { GetPostByIdValidator } from "@/main/validators/get-post-by-id";

export function makeGetPostByIdController(): GetPostByIdController {
  return new GetPostByIdController(
    new GetPostByIdUseCase(new PostRepository(db)),
    new JoiValidator(GetPostByIdValidator)
  );
}
