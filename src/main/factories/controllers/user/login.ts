import { LoginController } from "@/application/controllers";
import { JoiValidator } from "@/main/adapters/joi-validator";
import { makeLoginUseCase } from "@/main/factories/usecases/user/login";
import { loginValidator } from "@/main/validators";

export function makeLoginController(): LoginController {
  return new LoginController(
    makeLoginUseCase(),
    new JoiValidator(loginValidator)
  );
}
