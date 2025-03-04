import { Comment } from "@/domain/models";
import { IUseCase } from "@/domain/usecases/usecase";

export interface ICommentOnPostUseCaseInput {
  postId: string;
  userId: string;
  content: Comment["content"];
}

export interface ICommentOnPostUseCase
  extends IUseCase<ICommentOnPostUseCaseInput, Comment> {}
