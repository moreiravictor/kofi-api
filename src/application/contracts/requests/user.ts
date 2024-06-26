import {
  ILoginUseCaseInput,
  IRegisterUserUseCaseInput,
} from "@/domain/usecases";
import { IUpdateUserUseCaseInput } from "@/domain/usecases/user/update-user";

export type LoginRequest = ILoginUseCaseInput;

export type RegisterUserRequest = IRegisterUserUseCaseInput;

export type UpdateUserRequest = IUpdateUserUseCaseInput;
