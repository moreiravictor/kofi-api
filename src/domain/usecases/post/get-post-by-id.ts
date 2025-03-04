import { Post } from "@/domain/models/post";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetPostByIdUseCaseInput {
  postId: string;
}

export interface IGetPostByIdUseCase
  extends IUseCase<IGetPostByIdUseCaseInput, Post> {}
