import { User } from "@/domain/models/user";
import { IUsecase } from "@/domain/usecases/usecase";

export type ILoginUseCaseInput = Pick<User, "email" | "password">;
export type ILoginUseCaseOutput = Omit<User, "password">;

export interface ILoginUseCase extends IUsecase<ILoginUseCaseInput, Promise<ILoginUseCaseOutput>> {}
