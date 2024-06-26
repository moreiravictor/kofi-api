import { Post, PostType } from "@/domain/models/post";

export interface IFindManyPostsByTypeRepository {
  findMany(input: PostType): Promise<Post[]>;
}

export type ICreatePostRepositoryInput = {
  post: Omit<
    Post,
    | "comments"
    | "coffees"
    | "grinders"
    | "brewingMethods"
    | "cafeterias"
    | "user"
  > & { userId: string };
  topics: {
    coffeesIds?: string[];
    grindersIds?: string[];
    brewingMethodsIds?: string[];
    cafeteriasIds?: string[];
  };
};

export interface ICreatePostRepository {
  create(post: ICreatePostRepositoryInput): Promise<Post>;
}
