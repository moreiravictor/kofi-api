import { Post } from "@/domain/models/post";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetUserPostsUseCaseInput {
  userId: string;
}

export interface IGetUserPostsUseCase
  extends IUseCase<IGetUserPostsUseCaseInput, Post[]> {}
