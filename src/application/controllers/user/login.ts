import { IController } from "@/application/contracts/controller";
import {
  isGoogleSignIn,
  LoginRequest,
} from "@/application/contracts/requests/user";
import { LoginValidator } from "@/application/contracts/validator";
import { LoginUseCase } from "@/application/usecases";
import { GoogleSignInUseCase } from "@/application/usecases/user/google-sign-in";
import { ILoginUseCaseOutput } from "@/domain/usecases";

export class LoginController
  implements IController<LoginRequest, ILoginUseCaseOutput>
{
  constructor(
    private readonly dbLoginUseCase: LoginUseCase,
    private readonly googleSignInUseCase: GoogleSignInUseCase,
    private readonly validator: LoginValidator
  ) {}

  async control(input: LoginRequest) {
    console.log("received a login request", input);

    try {
      this.validator.validate(input);

      if (isGoogleSignIn(input)) {
        return await this.googleSignInUseCase.execute(input.data);
      } else {
        return await this.dbLoginUseCase.execute(input.data);
      }
    } catch (e) {
      console.log("login error");

      throw e;
    }
  }
}
