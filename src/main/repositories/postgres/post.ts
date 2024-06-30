import { Post, PostType } from "@/domain/models/post";
import { TopicType } from "@/domain/models/topic";
import {
  ICreatePostRepository,
  ICreatePostRepositoryInput,
  IFindManyPostsByTypeRepository,
} from "@/domain/repositories/post";
import { TopicRepository } from "@/main/repositories/postgres/topic";
import { UserRepository } from "@/main/repositories/postgres/user";
import { PostType as DBPostType, Prisma, PrismaClient } from "@prisma/client";

type DBPost = Prisma.PostGetPayload<{
  include: {
    Photos: true;
    User: { include: { ProfilePhoto: true; Address: true } };
    Topics: {
      include: {
        Photo: true;
        BrewingMethod: { include: { Brand: true } };
        Cafeteria: { include: { Address: true } };
        Coffee: { include: { Brand: true } };
        Grinder: { include: { Brand: true } };
      };
    };
    Comments: true;
  };
}>;

export class PostRepository
  implements IFindManyPostsByTypeRepository, ICreatePostRepository
{
  constructor(private readonly db: PrismaClient) {}

  static fromDbToEntitites(dbPosts: DBPost[]): Post[] {
    return dbPosts.map(PostRepository.fromDbToEntitity);
  }

  static fromDbToEntitity(dbPost: DBPost): Post {
    return {
      id: dbPost.id,
      content: dbPost.content,
      title: dbPost.title,
      type: dbPost.type as PostType,
      likesAmount: dbPost.likesAmount,
      photos: dbPost.Photos, //TODO: fix this
      comments: dbPost.Comments, //TODO: fix this
      user: UserRepository.fromDBToEntity(dbPost.User),
      topics: TopicRepository.fromDbToEntities(dbPost.Topics),
    };
  }

  private fromEntityToDbCreate(post: Post) {}

  async findMany(type: PostType): Promise<Post[]> {
    const posts = await this.db.post.findMany({
      include: {
        Photos: true,
        User: { include: { Address: true, ProfilePhoto: true } },
        Topics: {
          include: {
            Photo: true,
            BrewingMethod: { include: { Brand: true } },
            Cafeteria: { include: { Address: true } },
            Coffee: { include: { Brand: true } },
            Grinder: { include: { Brand: true } },
          },
        },
        Comments: true,
      },
      take: 10,
      where: { type: type as unknown as DBPostType },
    });

    return PostRepository.fromDbToEntitites(posts);
  }

  async create({ post, topics }: ICreatePostRepositoryInput): Promise<Post> {
    const postCreated = await this.db.post.create({
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        likesAmount: post.likesAmount,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        type: post.type as unknown as DBPostType,
        User: { connect: { id: post.userId } },
        Topics: {
          connect: topics.ids.map((id) => ({
            id,
            type: topics.type as TopicType,
          })),
        },
        Photos: { createMany: { data: post.photos } },
      },
      include: {
        Photos: true,
        User: { include: { Address: true, ProfilePhoto: true } },
        Topics: {
          include: {
            Photo: true,
            BrewingMethod: { include: { Brand: true } },
            Cafeteria: { include: { Address: true } },
            Coffee: { include: { Brand: true } },
            Grinder: { include: { Brand: true } },
          },
        },
        Comments: true,
      },
    });

    return PostRepository.fromDbToEntitity(postCreated);
  }
}
