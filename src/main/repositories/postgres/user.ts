import { User } from "@/domain/models/user";
import { IFindOneUserByUsenameAndPassword } from "@/domain/repositories/user";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IFindOneUserByUsenameAndPassword {

  constructor(private readonly db: PrismaClient) {}

  async findOne(email: string, password: string): Promise<User | null> {
    //TODO decode/encode password
    const userDb = await this.db.user.findUnique({ where: { email, password } });

    return userDb;
  }
}