import { IController } from "@/application/contracts/controller";
import { LoginRequest } from "@/application/contracts/requests/login";
import { LoginUseCase } from "@/application/usecases";
import { ILoginUseCaseOutput } from "@/domain/usecases";

export class LoginController implements IController<LoginRequest, ILoginUseCaseOutput>{

  constructor(private readonly dbLoginUseCase: LoginUseCase, private readonly googleLoginUseCase: LoginUseCase) {}

  async control({ data, type }: LoginRequest) {

    try {
      switch (type) {
        case "google":
          return this.googleLoginUseCase.execute(data);
        case "internal":
          return this.dbLoginUseCase.execute(data);
      }
    } catch (e) {
      console.log("login error");

      throw e;
    }

  }
}