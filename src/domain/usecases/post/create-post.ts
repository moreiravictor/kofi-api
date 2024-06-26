import { Post } from "@/domain/models";
import { ICreatePostRepositoryInput } from "@/domain/repositories";
import { IUseCase } from "@/domain/usecases/usecase";

export type ICreatePostUseCaseInput = ICreatePostRepositoryInput;

export interface ICreatePostUseCase
  extends IUseCase<ICreatePostUseCaseInput, Post> {}
