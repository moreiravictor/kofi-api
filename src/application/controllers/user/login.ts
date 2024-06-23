import { IController } from "@/application/contracts/controller";
import { LoginRequest } from "@/application/contracts/requests/user";
import { LoginValidator } from "@/application/contracts/validator";
import { LoginUseCase } from "@/application/usecases";
import { ILoginUseCaseOutput } from "@/domain/usecases";

export class LoginController implements IController<LoginRequest, ILoginUseCaseOutput>{

  constructor(
    private readonly dbLoginUseCase: LoginUseCase,
    private readonly validator: LoginValidator
  ) {}

  async control(input: LoginRequest) {

    try {
    this.validator.validate(input);

    return await this.dbLoginUseCase.execute(input);
    } catch (e) {
      console.log("login error");

      throw e;
    }

  }
}