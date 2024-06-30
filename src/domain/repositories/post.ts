import { Post, PostType } from "@/domain/models/post";

export interface IFindManyPostsByTypeRepository {
  findMany(input: PostType): Promise<Post[]>;
}

export type ICreatePostRepositoryInput = {
  post: Omit<Post, "user" | "topics"> & { userId: string };
  topics: { type: string; ids: string[] };
};

export interface ICreatePostRepository {
  create(post: ICreatePostRepositoryInput): Promise<Post>;
}
