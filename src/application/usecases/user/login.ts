import { PasswordCryptographer } from "@/application/contracts/adapters/password-criptographer";
import {
  NoPasswordFoundError,
  UserNotFoundError,
  WrongPasswordError,
} from "@/application/contracts/errors";
import { IFindOneUserByEmailRepository } from "@/domain/repositories/user";
import {
  ILoginUseCase,
  ILoginUseCaseInput,
  ILoginUseCaseOutput,
} from "@/domain/usecases";

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly userRepository: IFindOneUserByEmailRepository) {}

  async execute({
    email,
    password,
  }: ILoginUseCaseInput): Promise<ILoginUseCaseOutput> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.password) {
      throw new NoPasswordFoundError();
    }

    if (!PasswordCryptographer.validate(password, user.password)) {
      throw new WrongPasswordError();
    }

    const { password: _, ...userWithoutPassword } = user;

    console.log("found user:", userWithoutPassword);

    return userWithoutPassword;
  }
}
