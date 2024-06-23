import { IController } from "@/application/contracts/controller";
import { RegisterUserRequest } from "@/application/contracts/requests/user";
import { RegisterUserValidator } from "@/application/contracts/validator";
import { RegisterUserUseCase } from "@/application/usecases";
import { User } from "@/domain/models/user";

export class RegisterUserController implements IController<RegisterUserRequest, User> {

  constructor(private readonly registerUseCase: RegisterUserUseCase, private readonly validator: RegisterUserValidator) {}

  async control(input: RegisterUserRequest): Promise<User> {
    this.validator.validate(input);

    return await this.registerUseCase.execute(input);
  }

}