import { User } from "@/domain/models/user";
import { IUseCase } from "@/domain/usecases/usecase";

export type ILoginUseCaseInput = { email: string; password: string };

export type ILoginUseCaseOutput = Omit<User, "password">;

export interface ILoginUseCase
  extends IUseCase<ILoginUseCaseInput, ILoginUseCaseOutput> {}
