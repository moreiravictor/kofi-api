import { LoginController } from "@/application/controllers";
import { LoginUseCase } from "@/application/usecases";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";
import { loginValidator } from "@/main/validators";

export function makeLoginController(): LoginController {
  return new LoginController(new LoginUseCase(new UserRepository(db)), new JoiValidator(loginValidator));
}