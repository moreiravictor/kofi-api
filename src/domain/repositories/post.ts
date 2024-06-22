import { Post, PostType } from "@/domain/models/post";

export interface IFindManyPostsByTypeRepository {
  findMany(input: PostType): Promise<Post[]>;
}