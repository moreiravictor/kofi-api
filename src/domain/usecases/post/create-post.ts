import { Post } from "@/domain/models";
import { ICreatePostRepositoryInput } from "@/domain/repositories";
import { IUseCase } from "@/domain/usecases/usecase";
import { OmitDeep } from "type-fest";

export type ICreatePostUseCaseInput = OmitDeep<
  ICreatePostRepositoryInput,
  "id" | "photos.0.id" | "comments" | "likesAmount"
>;

export interface ICreatePostUseCase
  extends IUseCase<ICreatePostUseCaseInput, Post> {}
