import { ILoginUseCaseInput, IRegisterUserUseCaseInput } from "@/domain/usecases";
import { IUpdateUserUseCaseInput } from "@/domain/usecases/user/update-user";

export interface LoginRequest {
  type: "internal" | "google";
  data: ILoginUseCaseInput;
}

export type RegisterUserRequest = IRegisterUserUseCaseInput;

export type UpdateUserRequest = { id: string, data: Omit<IUpdateUserUseCaseInput, "id"> };
