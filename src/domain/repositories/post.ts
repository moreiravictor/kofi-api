import { Post, PostType } from "@/domain/models/post";
import { TopicType } from "@/domain/models/topic";

export interface IFindManyPostsByTypeRepository {
  findMany(input: PostType): Promise<Post[]>;
}

export type ICreatePostRepositoryInput = {
  post: Omit<Post, "user" | "topics"> & { userId: string };
  topics: { type: TopicType; ids: string[] };
};

export interface ICreatePostRepository {
  create(post: ICreatePostRepositoryInput): Promise<Post>;
}
