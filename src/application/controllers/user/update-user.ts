import { IController } from "@/application/contracts/controller";
import { UpdateUserRequest } from "@/application/contracts/requests/user";
import { UpdateUserValidator } from "@/application/contracts/validator";
import { UpdateUserUseCase } from "@/application/usecases/user/update-user";
import { IUpdateUserUseCaseOutput } from "@/domain/usecases/user/update-user";

export class UpdateUserController
  implements IController<UpdateUserRequest, IUpdateUserUseCaseOutput>
{
  constructor(
    private readonly updateUserUsecase: UpdateUserUseCase,
    private readonly validator: UpdateUserValidator
  ) {}

  async control(input: UpdateUserRequest): Promise<IUpdateUserUseCaseOutput> {
    try {
      this.validator.validate(input);

      return await this.updateUserUsecase.execute(input);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
