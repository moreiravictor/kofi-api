import { Post, PostType } from "@/domain/models/post";
import { TopicType } from "@/domain/models/topic";
import { IPaginated, IPaginationParams } from "@/domain/usecases/pagination";

export interface IFindManyPostsByTypeRepository {
  findMany(
    pagination: IPaginationParams,
    input?: PostType
  ): Promise<IPaginated<Post>>;
}

export interface IFindTopPostsByTypeRepository {
  findTopByType(input: PostType): Promise<Post[]>;
}

export interface IFindManyPostsByUserIdRepository {
  findManyByUserId(userId: string): Promise<Post[]>;
}

export interface IFindPostByIdRepository {
  find(postId: string): Promise<Post | null>;
}

export type ICreatePostRepositoryInputTopics = Array<{
  type: TopicType;
  id: string;
}>;

export function isICreatePostRepositoryInputTopics(
  input: ICreatePostRepositoryInputTopics | { type: TopicType; ids: string[] }
): input is ICreatePostRepositoryInputTopics {
  return Array.isArray(input);
}

export type ICreatePostRepositoryInput = Omit<Post, "user" | "topics"> & {
  userId: string;
} & { topics: ICreatePostRepositoryInputTopics };

export interface ICreatePostRepository {
  create(post: ICreatePostRepositoryInput): Promise<Post>;
}
