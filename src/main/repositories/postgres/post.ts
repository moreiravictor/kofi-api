import { Post, PostType } from "@/domain/models/post";
import { TopicType } from "@/domain/models/topic";
import {
  ICreatePostRepository,
  ICreatePostRepositoryInput,
  IFindManyPostsByTypeRepository,
} from "@/domain/repositories/post";
import { IPaginated, IPaginationParams } from "@/domain/usecases/pagination";
import { CommentRepository } from "@/main/repositories/postgres/comment";
import { PhotoRepository } from "@/main/repositories/postgres/photo";
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
    Comments: {
      include: { User: { include: { ProfilePhoto: true; Address: true } } };
    };
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
      photos: PhotoRepository.fromDbToEntities(dbPost.Photos),
      comments: CommentRepository.fromDbToEntities(dbPost.Comments),
      user: UserRepository.fromDBToEntity(dbPost.User),
      topics: TopicRepository.fromDbToEntities(dbPost.Topics),
    };
  }

  async findMany(
    pagination: IPaginationParams,
    type?: PostType
  ): Promise<IPaginated<Post>> {
    const { page, limit } = pagination;

    const where = { ...(type && { type: type as unknown as DBPostType }) };

    const [total, posts] = await Promise.all([
      this.db.post.count({ where }),
      this.db.post.findMany({
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
          Comments: {
            include: {
              User: { include: { ProfilePhoto: true, Address: true } },
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      items: PostRepository.fromDbToEntitites(posts),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        itemsPerPage: limit,
        totalItems: total,
      },
    };
  }

  async create(post: ICreatePostRepositoryInput): Promise<Post> {
    console.log(post);
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
          connect: post.topics.ids.map((id) => ({
            id,
            type: post.topics.type as TopicType,
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
        Comments: {
          include: { User: { include: { ProfilePhoto: true, Address: true } } },
        },
      },
    });

    return PostRepository.fromDbToEntitity(postCreated);
  }
}
