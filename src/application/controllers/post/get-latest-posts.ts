import { IController } from "@/application/contracts/controller";
import { GetLatestPostsRequest } from "@/application/contracts/requests";
import { GetLatestPostsValidator } from "@/application/contracts/validator";
import { GetLatestPostsUseCase } from "@/application/usecases";
import {
  IGetLatestPostsPaginatedUseCaseInput,
  IGetLatestPostsPaginatedUseCaseOutput,
} from "@/domain/usecases";

export class GetLatestPostsController
  implements
    IController<
      IGetLatestPostsPaginatedUseCaseInput,
      IGetLatestPostsPaginatedUseCaseOutput
    >
{
  constructor(
    private readonly postsUseCase: GetLatestPostsUseCase,
    private readonly validator: GetLatestPostsValidator
  ) {}

  control(
    input: GetLatestPostsRequest
  ): Promise<IGetLatestPostsPaginatedUseCaseOutput> {
    this.validator.validate(input);

    return this.postsUseCase.execute(input);
  }
}
