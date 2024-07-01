import { User } from "@/domain/models/user";
import { IUseCase } from "@/domain/usecases/usecase";

export type IRegisterUserUseCaseInput = Pick<
  User,
  "email" | "username" | "password"
>;
export type IRegisterUserUseCaseOutPut = Omit<User, "password">;

export interface IRegisterUserUseCase
  extends IUseCase<IRegisterUserUseCaseInput, IRegisterUserUseCaseOutPut> {}
