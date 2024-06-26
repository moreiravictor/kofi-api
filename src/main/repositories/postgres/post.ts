import { Post, PostType } from "@/domain/models/post";
import {
  ICreatePostRepository,
  ICreatePostRepositoryInput,
  IFindManyPostsByTypeRepository,
} from "@/domain/repositories/post";
import { BrewingMethodRepository } from "@/main/repositories/postgres/brewing-method";
import { CafeteriaRepository } from "@/main/repositories/postgres/cafeteria";
import { CoffeeRepository } from "@/main/repositories/postgres/coffee";
import { GrinderRepository } from "@/main/repositories/postgres/grinder";
import { UserRepository } from "@/main/repositories/postgres/user";
import { PostType as DBPostType, Prisma, PrismaClient } from "@prisma/client";

type DBPost = Prisma.PostGetPayload<{
  include: {
    Photos: true;
    User: { include: { ProfilePhoto: true; Address: true } };
    Coffees: { include: { Brand: true; Photo: true } };
    Cafeterias: { include: { Address: true } };
    BrewingMethods: { include: { Brand: true; Photo: true } };
    Comments: true;
    Grinders: { include: { Brand: true; Photo: true } };
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
      user: UserRepository.fromDBToEntity(dbPost.User),
      brewingMethods: BrewingMethodRepository.fromDbToEntities(
        dbPost.BrewingMethods
      ),
      cafeterias: CafeteriaRepository.fromDbToEntities(dbPost.Cafeterias),
      coffees: CoffeeRepository.fromDbToEntities(dbPost.Coffees),
      comments: dbPost.Comments, //TODO: fix this
      grinders: GrinderRepository.fromDbToEntities(dbPost.Grinders),
    };
  }

  private fromEntityToDbCreate(post: Post) {}

  async findMany(type: PostType): Promise<Post[]> {
    const posts = await this.db.post.findMany({
      include: {
        Photos: true,
        User: { include: { Address: true, ProfilePhoto: true } },
        Coffees: { include: { Brand: true, Photo: true } },
        Grinders: { include: { Brand: true, Photo: true } },
        Cafeterias: { include: { Address: true } },
        BrewingMethods: { include: { Brand: true, Photo: true } },
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
        Cafeterias: {
          connect: topics.cafeteriasIds?.map((id) => ({ id })),
        },
        Coffees: {
          connect: topics.coffeesIds?.map((id) => ({ id })),
        },
        Grinders: {
          connect: topics.grindersIds?.map((id) => ({ id })),
        },
        BrewingMethods: {
          connect: topics.brewingMethodsIds?.map((id) => ({ id })),
        },
        Photos: { createMany: { data: post.photos } },
      },
      include: {
        Photos: true,
        User: { include: { Address: true, ProfilePhoto: true } },
        Coffees: { include: { Brand: true, Photo: true } },
        Grinders: { include: { Brand: true, Photo: true } },
        Cafeterias: { include: { Address: true } },
        BrewingMethods: { include: { Brand: true, Photo: true } },
        Comments: true,
      },
    });

    return PostRepository.fromDbToEntitity(postCreated);
  }
}
