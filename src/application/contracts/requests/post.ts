import {
  ICreatePostUseCaseInput,
  IGetLatestPostsPaginatedUseCaseInput,
} from "@/domain/usecases";

export type CreatePostRequest = ICreatePostUseCaseInput;
export type GetLatestPostsRequest = IGetLatestPostsPaginatedUseCaseInput;
