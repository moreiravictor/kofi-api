import { buildPaginationParams } from "@/application/builders/pagination";
import { IFindManyPostsByTypeRepository } from "@/domain/repositories/post";
import {
  IGetLatestPostsPaginatedUseCase,
  IGetLatestPostsPaginatedUseCaseInput,
  IGetLatestPostsPaginatedUseCaseOutput,
} from "@/domain/usecases";

export class GetLatestPostsUseCase implements IGetLatestPostsPaginatedUseCase {
  constructor(
    private readonly postsRepository: IFindManyPostsByTypeRepository
  ) {}

  async execute(
    input: IGetLatestPostsPaginatedUseCaseInput
  ): Promise<IGetLatestPostsPaginatedUseCaseOutput> {
    return this.postsRepository.findMany(
      buildPaginationParams(input),
      input.type
    );
  }
}
