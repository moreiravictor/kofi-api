import { UserNotFoundError } from "@/application/contracts/errors";
import { IFindOneUserByUsenameAndPassword } from "@/domain/repositories/user";
import { ILoginUseCase, ILoginUseCaseInput, ILoginUseCaseOutput } from "@/domain/usecases";

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly userRepository: IFindOneUserByUsenameAndPassword) {}

  async execute({ email, password }: ILoginUseCaseInput): Promise<ILoginUseCaseOutput> {
    const user = await this.userRepository.findOne(email, password);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

}