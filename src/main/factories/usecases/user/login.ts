import { LoginUseCase } from "@/application/usecases";
import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";

export function makeLoginUseCase(): LoginUseCase {
  return new LoginUseCase(new UserRepository(db));
}
