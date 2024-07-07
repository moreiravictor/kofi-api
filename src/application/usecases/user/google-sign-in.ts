import {
  GOOGLE_SIGN_IN_ANDROID_CLIENT_ID,
  GOOGLE_SIGN_IN_ISSUER,
  GOOGLE_SIGN_IN_WEB_CLIENT_ID,
} from "@/application/contracts/env";
import { UnauthorizedGoogleSignInError } from "@/application/contracts/errors";
import {
  ICreateUserRepository,
  IFindOneUserByEmailRepository,
} from "@/domain/repositories";
import {
  IGoogleSignInUseCase,
  IGoogleSignInUseCaseInput,
  IGoogleSignInUseCaseOutput,
} from "@/domain/usecases";
import { randomUUID } from "crypto";

import jwt from "jsonwebtoken";

interface GoogleTokenData {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
}

export class GoogleSignInUseCase implements IGoogleSignInUseCase {
  constructor(
    private readonly userRepository: IFindOneUserByEmailRepository &
      ICreateUserRepository
  ) {}

  async execute(
    input: IGoogleSignInUseCaseInput
  ): Promise<IGoogleSignInUseCaseOutput> {
    const tokenData = jwt.decode(input.idToken) as GoogleTokenData;

    if (
      tokenData.aud !== GOOGLE_SIGN_IN_WEB_CLIENT_ID ||
      tokenData.azp !== GOOGLE_SIGN_IN_ANDROID_CLIENT_ID ||
      tokenData.iss !== GOOGLE_SIGN_IN_ISSUER ||
      new Date(tokenData.exp * 1000) < new Date()
    ) {
      throw new UnauthorizedGoogleSignInError();
    }

    const user = await this.userRepository.findOneByEmail(tokenData.email);

    if (!user) {
      const { password, ...createdUser } = await this.userRepository.create({
        id: randomUUID(),
        email: tokenData.email,
        username: tokenData.name,
        password: null,
        address: null,
        phone: null,
        profilePhoto: { id: randomUUID(), url: tokenData.picture },
      });

      return createdUser;
    }

    return user;
  }
}
