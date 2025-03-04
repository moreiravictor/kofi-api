import { CommentOnPostController } from "@/application/controllers/post/comment-on-post";
import { CommentOnPostUseCase } from "@/application/usecases/post/comment-on-post";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { CommentRepository } from "@/main/repositories/postgres/comment";
import { CommentOnPostValidator } from "@/main/validators/comment-on-post";

export function makeComentOnPostController() {
  return new CommentOnPostController(
    new CommentOnPostUseCase(new CommentRepository(db)),
    new JoiValidator(CommentOnPostValidator)
  );
}
