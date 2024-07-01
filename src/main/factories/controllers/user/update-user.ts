import { UpdateUserController } from "@/application/controllers";
import { UpdateUserUseCase } from "@/application/usecases/user/update-user";
import { JoiValidator } from "@/main/adapters/joi-validator";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";
import { updateUserValidator } from "@/main/validators/update-user";

export function makeUpdateUserController() {
  return new UpdateUserController(
    new UpdateUserUseCase(new UserRepository(db)),
    new JoiValidator(updateUserValidator)
  );
}
