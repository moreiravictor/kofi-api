import { Post, PostType } from "@/domain/models/post";
import {
  IPaginated,
  IWithOptionalPaginationParams,
} from "@/domain/usecases/pagination";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetLatestPostsPaginatedUseCaseInput
  extends IWithOptionalPaginationParams<{
    type?: PostType;
  }> {}

export interface IGetLatestPostsPaginatedUseCaseOutput
  extends IPaginated<Post> {}

export interface IGetLatestPostsPaginatedUseCase
  extends IUseCase<
    IGetLatestPostsPaginatedUseCaseInput,
    IGetLatestPostsPaginatedUseCaseOutput
  > {}
