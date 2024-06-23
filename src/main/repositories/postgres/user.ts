import { PostType } from "@/domain/models/post";
import { User } from "@/domain/models/user";
import { ICreateUserRepository, IFindOneUserByUsenameAndPasswordRepository } from "@/domain/repositories/user";
import { PrismaClient, type Prisma } from "@prisma/client";

type DBUser = Prisma.UserGetPayload<{include: { Address: true, ProfilePhoto: true, Posts: { include: { Photos: true, Comments: true } }}}>;

type DBUserCreate = Prisma.UserCreateInput;

export class UserRepository implements IFindOneUserByUsenameAndPasswordRepository, ICreateUserRepository {

  constructor(private readonly db: PrismaClient) {}

  private fromDBToEntity(userDb: DBUser): User {
    return {
      email: userDb.email,
      id: userDb.id,
      password: userDb.password,
      phone: userDb.phone,
      username: userDb.username,
      profilePhoto: userDb.ProfilePhoto? {
        id: userDb.ProfilePhoto.id,
        url: userDb.ProfilePhoto.url
      } : null,
      address: userDb.Address ? {
        id: userDb.Address.id,
        city: userDb.Address.city,
        uf: userDb.Address.uf,
        neighborhood: userDb.Address.neighborhood,
        number: userDb.Address.number,
        streetName: userDb.Address.streetName,
        zipCode: userDb.Address.zipCode,
        complement: userDb.Address.complement,

      } : null,
      posts: userDb.Posts.map(post => ({
        type: post.type as PostType,
        id: post.id,
        title: post.title,
        content: post.content,
        likeAmount: post.likesAmount,
        photos:     post.Photos,
        comments: post.Comments
      }))
    };
  }

  private fromEntityToDBCreate(input: User): DBUserCreate {
  return {
    id: input.id,
    email: input.email,
    password: input.password,
    phone: input.phone,
    username: input.username,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    Address: {
      create: input.address ? {
        id: input.address.id,
        city: input.address.city,
        uf: input.address.uf,
        neighborhood: input.address.neighborhood,
        number: input.address.number,
        streetName: input.address.streetName,
        zipCode: input.address.zipCode,
        complement: input.address.complement,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      } : undefined
    },
    ProfilePhoto: {
      create: input.profilePhoto ? {
        postId: null,
        url: input.profilePhoto.url,
        id: input.profilePhoto.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      } : undefined
    }
  }
}

  async findOne(email: string, password: string): Promise<User | null> {
    const userDb = await this.db.user.findUnique({
      where: { email, password },
      include: {
        Address: true,
        ProfilePhoto: true,
        Posts: {
          include: { Photos: true, Comments: true }
        }
      }
    });

    if (!userDb) {
      return null;
    }

    return this.fromDBToEntity(userDb);
  }

  async create(input: User): Promise<User> {
    const userCreatedDb = await this.db.user.create({ data: this.fromEntityToDBCreate(input), include: { Address: true, ProfilePhoto: true } });

    return this.fromDBToEntity({ ... userCreatedDb, Posts: [] });
  }

}