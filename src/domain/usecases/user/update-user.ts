import { User } from "@/domain/models/user";
import { IUseCase } from "@/domain/usecases/usecase";

export type IUpdateUserUseCaseInput = Omit<User, "posts" | "password"> & {
  password: string;
};
export type IUpdateUserUseCaseOutput = Omit<User, "password">;

export interface IUpdateUserUseCase
  extends IUseCase<IUpdateUserUseCaseInput, IUpdateUserUseCaseOutput> {}
