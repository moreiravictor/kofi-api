import { User } from "@/domain/models/user";

export interface IFindOneUserByUsenameAndPasswordRepository {
  findOneByEmailAndPassword(email: string, password: string): Promise<User | null>;
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

