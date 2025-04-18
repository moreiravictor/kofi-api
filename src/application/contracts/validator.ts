import {
  CommentOnPostRequest,
  CreatePostRequest,
  GetLatestPostsRequest,
  GetPostByIdRequest,
  GetUserPostsRequest,
} from "@/application/contracts/requests";
import {
  LoginRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "@/application/contracts/requests/user";

export interface RequestValidator<T> {
  validate(input: T): void;
}

export type LoginValidator = RequestValidator<LoginRequest>;
export type UpdateUserValidator = RequestValidator<UpdateUserRequest>;
export type RegisterUserValidator = RequestValidator<RegisterUserRequest>;

export type CreatePostValidator = RequestValidator<CreatePostRequest>;
export type CommentOnPostValidator = RequestValidator<CommentOnPostRequest>;
export type GetLatestPostsValidator = RequestValidator<GetLatestPostsRequest>;
export type GetPostByIdValidator = RequestValidator<GetPostByIdRequest>;
export type GetUserPostsValidator = RequestValidator<GetUserPostsRequest>;
