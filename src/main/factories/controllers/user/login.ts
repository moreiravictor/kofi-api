import { LoginController } from "@/application/controllers";
import { GoogleSignInUseCase } from "@/application/usecases/user/google-sign-in";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { makeLoginUseCase } from "@/main/factories/usecases/user/login";
import { UserRepository } from "@/main/repositories/postgres/user";
import { loginValidator } from "@/main/validators";

export function makeLoginController(): LoginController {
  return new LoginController(
    makeLoginUseCase(),
    new GoogleSignInUseCase(new UserRepository(db)),
    new JoiValidator(loginValidator)
  );
}
