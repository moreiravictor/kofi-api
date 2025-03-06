import { Post } from "@/domain/models";
import { IFindManyPostsByUserIdRepository } from "@/domain/repositories";
import {
  IGetUserPostsUseCase,
  IGetUserPostsUseCaseInput,
} from "@/domain/usecases";

export class GetUserPostsUseCase implements IGetUserPostsUseCase {
  constructor(
    private readonly postsRepository: IFindManyPostsByUserIdRepository
  ) {}
  execute(input: IGetUserPostsUseCaseInput): Promise<Post[]> {
    return this.postsRepository.findManyByUserId(input.userId);
  }
}
