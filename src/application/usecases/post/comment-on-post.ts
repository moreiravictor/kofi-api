import { Comment } from "@/domain/models";
import { ICreateCommentRepository } from "@/domain/repositories";
import {
  ICommentOnPostUseCase,
  ICommentOnPostUseCaseInput,
} from "@/domain/usecases";

export class CommentOnPostUseCase implements ICommentOnPostUseCase {
  constructor(private readonly commentRepository: ICreateCommentRepository) {}

  execute(input: ICommentOnPostUseCaseInput): Promise<Comment> {
    return this.commentRepository.create(input);
  }
}
