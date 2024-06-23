import { User } from "@/domain/models/user";
import { ICreateUserRepository } from "@/domain/repositories/user";
import { IRegisterUserUseCase, IRegisterUserUseCaseInput } from "@/domain/usecases";
import { randomUUID } from "crypto";

export class RegisterUserUseCase implements IRegisterUserUseCase {

  constructor(private readonly userRepository: ICreateUserRepository) {}

  execute(input: IRegisterUserUseCaseInput): Promise<User> {
    return this.userRepository.create({
      id: randomUUID(),
      address: null,
      phone: null,
      posts: [],
      profilePhoto: null,
      ...input
    });
  }
}