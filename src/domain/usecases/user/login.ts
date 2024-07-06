import { User } from "@/domain/models/user";
import { IUseCase } from "@/domain/usecases/usecase";

export enum LoginType {
  GOOGLE = "google",
  EMAIL = "email",
}

export interface GoogleSignInInput {
  type: LoginType.GOOGLE;
  data: { idToken: string };
}

export function isGoogleSignIn(
  input: ILoginUseCaseInput
): input is GoogleSignInInput {
  return (<GoogleSignInInput>input).data.idToken !== undefined;
}

export interface EmailSignInInput {
  type: LoginType.EMAIL;
  data: Pick<User, "email" | "password">;
}

export type ILoginUseCaseInput = GoogleSignInInput | EmailSignInInput;

export type ILoginUseCaseOutput = Omit<User, "password">;

export interface ILoginUseCase
  extends IUseCase<ILoginUseCaseInput, ILoginUseCaseOutput> {}
