import {
  IGoogleSignInUseCaseInput,
  ILoginUseCaseInput,
} from "@/domain/usecases";

export enum LoginType {
  GOOGLE = "google",
  EMAIL = "email",
}

export type GoogleSignInRequest = {
  type: LoginType.GOOGLE;
  data: IGoogleSignInUseCaseInput;
};

export type EmailLogInRequest = {
  type: LoginType.EMAIL;
  data: ILoginUseCaseInput;
};

export function isGoogleSignIn(
  request: LoginRequest
): request is GoogleSignInRequest {
  return request.type === LoginType.GOOGLE;
}

export type LoginRequest = GoogleSignInRequest | EmailLogInRequest;
