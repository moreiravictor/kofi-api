import { UserNotFoundError } from "@/application/contracts/errors";
import { User } from "@/domain/models/user";
import {
  ICreateUserRepository,
  IFindOneUserByEmailRepository,
  IFindOneUserByIdRepository,
  IUpdateUserByIdRepository,
} from "@/domain/repositories/user";
import { AddressRepository } from "@/main/repositories/postgres/address";
import { PhotoRepository } from "@/main/repositories/postgres/photo";
import { PrismaClient, type Prisma } from "@prisma/client";

type DBUser = Prisma.UserGetPayload<{
  include: {
    Address: true;
    ProfilePhoto: true;
  };
}>;

type DBUserCreate = Prisma.UserCreateInput;

type DBUserUpdate = Prisma.UserUpdateInput;

export class UserRepository
  implements
    IFindOneUserByEmailRepository,
    ICreateUserRepository,
    IUpdateUserByIdRepository,
    IFindOneUserByIdRepository
{
  constructor(private readonly db: PrismaClient) {}

  static fromDBToEntity(userDb: DBUser): User {
    return {
      email: userDb.email,
      id: userDb.id,
      password: userDb.password,
      phone: userDb.phone,
      username: userDb.username,
      profilePhoto: userDb.ProfilePhoto
        ? {
            id: userDb.ProfilePhoto.id,
            url: userDb.ProfilePhoto.url,
          }
        : null,
      address: userDb.Address
        ? {
            id: userDb.Address.id,
            city: userDb.Address.city,
            uf: userDb.Address.uf,
            neighborhood: userDb.Address.neighborhood,
            number: userDb.Address.number,
            streetName: userDb.Address.streetName,
            zipCode: userDb.Address.zipCode,
            complement: userDb.Address.complement,
          }
        : null,
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
        create: input.address
          ? AddressRepository.fromEntityToDBCreate(input.address)
          : undefined,
      },
      ProfilePhoto: {
        create: input.profilePhoto
          ? {
              postId: null,
              url: input.profilePhoto.url,
              id: input.profilePhoto.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            }
          : undefined,
      },
    };
  }

  private fromEntityToDBUpdate(input: Omit<User, "posts">): DBUserUpdate {
    return {
      email: input.email,
      password: input.password,
      phone: input.phone,
      username: input.username,
      updatedAt: new Date(),
      deletedAt: null,
    };
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const userDb = await this.db.user.findUnique({
      where: { email },
      include: {
        Address: true,
        ProfilePhoto: true,
        Posts: {
          include: { Photos: true, Comments: true },
        },
      },
    });

    if (!userDb) {
      return null;
    }

    return UserRepository.fromDBToEntity(userDb);
  }

  async findOneById(id: string): Promise<User | null> {
    const userDb = await this.db.user.findUnique({
      where: { id },
      include: {
        Address: true,
        ProfilePhoto: true,
        Posts: {
          include: { Photos: true, Comments: true },
        },
      },
    });

    if (!userDb) {
      return null;
    }

    return UserRepository.fromDBToEntity(userDb);
  }

  async create(input: User): Promise<User> {
    const userCreatedDb = await this.db.user.create({
      data: this.fromEntityToDBCreate(input),
      include: { Address: true, ProfilePhoto: true },
    });

    return UserRepository.fromDBToEntity(userCreatedDb);
  }

  async updateById(id: string, input: Omit<User, "posts">): Promise<User> {
    if (input.address) {
      await this.db.address.upsert({
        create: AddressRepository.fromEntityToDBCreate(input.address),
        update: AddressRepository.fromEntityToDBUpdate(input.address),
        where: { id: input.address.id },
      });
    }

    if (input.profilePhoto) {
      await this.db.photo.upsert({
        create: PhotoRepository.fromEntityToDBCreate(input.profilePhoto),
        update: PhotoRepository.fromEntityToDBUpdate(input.profilePhoto),
        where: { id: input.profilePhoto.id },
      });
    }

    await this.db.user.update({
      where: { id },
      data: {
        ...this.fromEntityToDBUpdate(input),
        addressId: input.address?.id ?? null,
        profilePhotoId: input.profilePhoto?.id ?? null,
        Address: undefined,
        ProfilePhoto: undefined,
      },
    });

    const user = await this.db.user.findUnique({
      where: { id },
      include: { Address: true, ProfilePhoto: true, Posts: true },
    });

    if (user) {
      return UserRepository.fromDBToEntity(user as DBUser);
    }

    throw new UserNotFoundError();
  }
}
