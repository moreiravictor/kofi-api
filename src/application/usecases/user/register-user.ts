import { PasswordCryptographer } from "@/application/contracts/adapters/password-criptographer";
import { ICreateUserRepository } from "@/domain/repositories/user";
import {
  IRegisterUserUseCase,
  IRegisterUserUseCaseInput,
  IRegisterUserUseCaseOutPut,
} from "@/domain/usecases";
import crypto from "crypto";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  async execute(
    input: IRegisterUserUseCaseInput
  ): Promise<IRegisterUserUseCaseOutPut> {
    const { password, ...createdUser } = await this.userRepository.create({
      ...input,
      password: PasswordCryptographer.encrypt(input.password),
      id: crypto.randomUUID(),
      address: null,
      phone: null,
      profilePhoto: null,
    });

    return createdUser;
  }
}
