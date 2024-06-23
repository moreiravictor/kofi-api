import { UserNotFoundError } from "@/application/contracts/errors";
import { User } from "@/domain/models/user";
import { IFindOneUserByIdRepository, IUpdateUserByIdRepository } from "@/domain/repositories/user";
import { IUpdateUserUseCase, IUpdateUserUseCaseInput } from "@/domain/usecases/user/update-user";

export class UpdateUserUseCase implements IUpdateUserUseCase {

  constructor(private readonly userRepository: IUpdateUserByIdRepository & IFindOneUserByIdRepository) {}

  async execute(input: IUpdateUserUseCaseInput): Promise<User> {
    const user = this.userRepository.findOneById(input.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return await this.userRepository.updateById(input.id, input);
  }

}