import { User } from "@/domain/models/user";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGoogleSignInUseCaseInput {
  idToken: string;
}

export type IGoogleSignInUseCaseOutput = Omit<User, "password">;

export interface IGoogleSignInUseCase
  extends IUseCase<IGoogleSignInUseCaseInput, IGoogleSignInUseCaseOutput> {}
