import { LoginController } from "@/application/controllers";
import { LoginUseCase } from "@/application/usecases";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";

export function makeLoginController(): LoginController {
  //todo implement google repository
  return new LoginController(new LoginUseCase(new UserRepository(db)), new LoginUseCase(new UserRepository(db)));
}