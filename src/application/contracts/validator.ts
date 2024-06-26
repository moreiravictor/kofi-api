import { CreatePostRequest } from "@/application/contracts/requests";
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
