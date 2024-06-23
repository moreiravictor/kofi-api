import { RegisterUserController } from "@/application/controllers";
import { RegisterUserUseCase } from "@/application/usecases";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";
import { registerUserValidator } from "@/main/validators";

export function makeRegisterUserController() {
  return new RegisterUserController(new RegisterUserUseCase(new UserRepository(db)), new JoiValidator(registerUserValidator));
}