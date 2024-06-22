import { User } from "@/domain/models/user";

export interface IFindOneUserByUsenameAndPassword {
  findOne(email: string, password: string): Promise<User | null>;
}