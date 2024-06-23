import { IController } from "@/application/contracts/controller";
import { RegisterUserRequest } from "@/application/contracts/requests/user";
import { RegisterUserUseCase } from "@/application/usecases";
import { User } from "@/domain/models/user";

export class RegisterUserController implements IController<RegisterUserRequest, User> {

  constructor(private readonly registerUseCase: RegisterUserUseCase) {}

  async control(input: RegisterUserRequest): Promise<User> {
    return await this.registerUseCase.execute(input);
  }

}