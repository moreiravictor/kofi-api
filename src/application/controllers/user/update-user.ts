import { IController } from "@/application/contracts/controller";
import { UpdateUserRequest } from "@/application/contracts/requests/user";
import { UpdateUserUseCase } from "@/application/usecases/user/update-user";
import { User } from "@/domain/models";

export class UpdateUserController implements IController<UpdateUserRequest, User> {

  constructor(private readonly updateUserUsecase: UpdateUserUseCase) {}

  async control({ id, data }: UpdateUserRequest): Promise<User> {
    try {
      return await this.updateUserUsecase.execute({ ...data, id });
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}