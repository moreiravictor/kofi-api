import {
  ICommentOnPostUseCaseInput,
  ICreatePostUseCaseInput,
  IGetLatestPostsPaginatedUseCaseInput,
  IGetPostByIdUseCaseInput,
  IGetUserPostsUseCaseInput,
} from "@/domain/usecases";

export type CreatePostRequest = ICreatePostUseCaseInput;
export type GetLatestPostsRequest = IGetLatestPostsPaginatedUseCaseInput;
export type GetPostByIdRequest = IGetPostByIdUseCaseInput;
export type GetUserPostsRequest = IGetUserPostsUseCaseInput;
export type CommentOnPostRequest = ICommentOnPostUseCaseInput;
