import { Post, PostType } from "@/domain/models/post";
import { IFindManyPostsByTypeRepository } from "@/domain/repositories/post";
import { Prisma, PrismaClient } from "@prisma/client";

type DBPost = Prisma.PostGetPayload<{include: { photos: true, user: true, Coffe: true }}>;


export class PostRepository implements IFindManyPostsByTypeRepository {

  constructor(private readonly db: PrismaClient) {}

  private fromDbToEntitites(dbPosts: DBPost[]): Post[] {
    return dbPosts.map((dbPost) => ({
      id: dbPost.id,
      content: dbPost.content,
      title: dbPost.title,
      type: dbPost.type as PostType,
      likeAmount: dbPost.likeAmount,
      photos: dbPost.photos,
    }))
  }

  async findMany(type: PostType): Promise<Post[]> {
    const posts = await this.db.post.findMany({ include: { photos: true, user: true, Coffe: true }, take: 10, where: { type } });

    return this.fromDbToEntitites(posts);
  }
}