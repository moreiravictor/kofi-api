import { Post, PostType } from "@/domain/models/post";
import { TopicType } from "@/domain/models/topic";
import { IPaginated, IPaginationParams } from "@/domain/usecases/pagination";

export interface IFindManyPostsByTypeRepository {
  findMany(
    pagination: IPaginationParams,
    input?: PostType
  ): Promise<IPaginated<Post>>;
}

export interface IFindManyPostsByUserIdRepository {
  findManyByUserId(userId: string): Promise<Post[]>;
}

export type ICreatePostRepositoryInput = Omit<Post, "user" | "topics"> & {
  userId: string;
} & { topics: { type: TopicType; ids: string[] } };

export interface ICreatePostRepository {
  create(post: ICreatePostRepositoryInput): Promise<Post>;
}
