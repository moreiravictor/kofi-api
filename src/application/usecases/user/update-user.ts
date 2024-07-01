import { PasswordCryptographer } from "@/application/contracts/adapters/password-criptographer";
import { UserNotFoundError } from "@/application/contracts/errors";
import {
  IFindOneUserByIdRepository,
  IUpdateUserByIdRepository,
} from "@/domain/repositories/user";
import {
  IUpdateUserUseCase,
  IUpdateUserUseCaseInput,
  IUpdateUserUseCaseOutput,
} from "@/domain/usecases/user/update-user";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly userRepository: IUpdateUserByIdRepository &
      IFindOneUserByIdRepository
  ) {}

  async execute(
    input: IUpdateUserUseCaseInput
  ): Promise<IUpdateUserUseCaseOutput> {
    const user = await this.userRepository.findOneById(input.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { password, ...userWithoutPassword } =
      await this.userRepository.updateById(input.id, {
        ...input,
        password: PasswordCryptographer.encrypt(input.password),
      });

    return userWithoutPassword;
  }
}
