import { User } from "@/domain/models/user";
import { IUseCase } from "@/domain/usecases/usecase";

export type IUpdateUserUseCaseInput = Omit<User, "posts">;

export interface IUpdateUserUseCase extends IUseCase<IUpdateUserUseCaseInput, User> {}
