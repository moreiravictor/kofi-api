import { RegisterUserController } from "@/application/controllers";
import { RegisterUserUseCase } from "@/application/usecases";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";

export function makeRegisterUserController() {
  return new RegisterUserController(new RegisterUserUseCase(new UserRepository(db)));
}