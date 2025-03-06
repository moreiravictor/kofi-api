import {
  ICommentOnPostUseCaseInput,
  ICreatePostUseCaseInput,
  IGetLatestPostsPaginatedUseCaseInput,
  IGetUserPostsUseCaseInput,
} from "@/domain/usecases";

export type CreatePostRequest = ICreatePostUseCaseInput;
export type GetLatestPostsRequest = IGetLatestPostsPaginatedUseCaseInput;
export type GetUserPostsRequest = IGetUserPostsUseCaseInput;
export type CommentOnPostRequest = ICommentOnPostUseCaseInput;
