import { IController } from "@/application/contracts/controller";
import { RegisterUserRequest } from "@/application/contracts/requests/user";
import { RegisterUserValidator } from "@/application/contracts/validator";
import { RegisterUserUseCase } from "@/application/usecases";
import { IRegisterUserUseCaseOutPut } from "@/domain/usecases";

export class RegisterUserController
  implements IController<RegisterUserRequest, IRegisterUserUseCaseOutPut>
{
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly validator: RegisterUserValidator
  ) {}

  async control(
    input: RegisterUserRequest
  ): Promise<IRegisterUserUseCaseOutPut> {
    this.validator.validate(input);

    return await this.registerUseCase.execute(input);
  }
}
