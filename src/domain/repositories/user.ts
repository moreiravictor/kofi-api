import { User } from "@/domain/models/user";

export interface IFindOneUserByEmailRepository {
  findOneByEmail(email: string): Promise<User | null>;
}

export interface IFindOneUserByIdRepository {
  findOneById(id: string): Promise<User | null>;
}

export interface ICreateUserRepository {
  create(input: User): Promise<User>;
}

export interface IUpdateUserByIdRepository {
  updateById(id: string, input: Omit<User, "posts">): Promise<User>;
}
