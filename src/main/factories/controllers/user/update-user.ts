import { UpdateUserController } from "@/application/controllers";
import { UpdateUserUseCase } from "@/application/usecases/user/update-user";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";

export function makeUpdateUserController() {
  return new UpdateUserController(new UpdateUserUseCase(new UserRepository(db)));
}