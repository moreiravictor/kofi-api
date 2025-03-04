import {
  ICommentOnPostUseCaseInput,
  ICreatePostUseCaseInput,
  IGetLatestPostsPaginatedUseCaseInput,
} from "@/domain/usecases";

export type CreatePostRequest = ICreatePostUseCaseInput;
export type GetLatestPostsRequest = IGetLatestPostsPaginatedUseCaseInput;
export type CommentOnPostRequest = ICommentOnPostUseCaseInput;
