import { UserNotFoundError } from "@/application/contracts/errors";
import { IFindOneUserByUsenameAndPasswordRepository } from "@/domain/repositories/user";
import { ILoginUseCase, ILoginUseCaseInput, ILoginUseCaseOutput } from "@/domain/usecases";

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly userRepository: IFindOneUserByUsenameAndPasswordRepository) {}

  async execute({ email, password }: ILoginUseCaseInput): Promise<ILoginUseCaseOutput> {
    const user = await this.userRepository.findOneByEmailAndPassword(email, password);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

}