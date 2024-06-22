import { PostType } from "@/domain/models/post";
import { User } from "@/domain/models/user";
import { IFindOneUserByUsenameAndPasswordRepository } from "@/domain/repositories/user";
import { PrismaClient, type Prisma } from "@prisma/client";

type DBUser = Prisma.UserGetPayload<{include: {Photo: true, Post: { include: { photos: true, Comment: true } }}}>;

export class UserRepository implements IFindOneUserByUsenameAndPasswordRepository {

  constructor(private readonly db: PrismaClient) {}

  private fromDBToEntity(userDb: DBUser): User {
    return {
      city: userDb.city,
      email: userDb.email,
      id: userDb.id,
      password: userDb.password,
      phone: userDb.phone,
      uf: userDb.uf,
      username: userDb.username,
      photo: userDb.Photo,
      posts: userDb.Post.map(post => ({
        type: post.type as PostType,
        id: post.id,
        title: post.title,
        content: post.content,
        likeAmount: post.likeAmount,
        photos:     post.photos,
        comments: post.Comment
      }))
    };
  }

  async findOne(email: string, password: string): Promise<User | null> {
    const userDb = await this.db.user.findUnique({
      where: { email, password },
      include: {
        Photo: true,
        Post: {
          include: { photos: true, Comment: true }
        }
      }
    });

    if (!userDb) {
      return null;
    }

    return this.fromDBToEntity(userDb);
  }
}