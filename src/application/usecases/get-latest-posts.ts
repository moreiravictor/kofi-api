import { Post, PostType } from "@/domain/models/post";
import { IFindManyPostsByTypeRepository } from "@/domain/repositories/post";
import { IGetLatestPostsUseCase } from "@/domain/usecases";

export class GetLatestPostsUseCase implements IGetLatestPostsUseCase {
  constructor(private readonly postsRepository: IFindManyPostsByTypeRepository) {}

  async execute(type: PostType): Promise<Post[]> {
    return this.postsRepository.findMany(type);
  }


}