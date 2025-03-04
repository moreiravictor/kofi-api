import { Post, PostType } from "@/domain/models/post";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetTopPostsByTypeUseCaseInput {
  type: PostType;
}

export interface IGetTopPostsByTypeUseCase
  extends IUseCase<IGetTopPostsByTypeUseCaseInput, Post[]> {}
