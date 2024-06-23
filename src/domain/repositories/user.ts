import { User } from "@/domain/models/user";

export interface IFindOneUserByUsenameAndPasswordRepository {
  findOne(email: string, password: string): Promise<User | null>;
}

export interface ICreateUserRepository {
  create(input: User): Promise<User>;
}
