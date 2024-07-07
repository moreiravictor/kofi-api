import { IRegisterUserUseCaseInput } from "@/domain/usecases";
import { IUpdateUserUseCaseInput } from "@/domain/usecases/user/update-user";

export type RegisterUserRequest = IRegisterUserUseCaseInput;

export type UpdateUserRequest = IUpdateUserUseCaseInput;

export * from "./ login";
