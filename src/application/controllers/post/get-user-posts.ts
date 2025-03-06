import { IController } from "@/application/contracts/controller";
import { GetUserPostsRequest } from "@/application/contracts/requests";
import { GetUserPostsValidator } from "@/application/contracts/validator";
import { GetUserPostsUseCase } from "@/application/usecases/post/get-user-posts";
import { Post } from "@/domain/models";
import { IGetUserPostsUseCaseInput } from "@/domain/usecases";

export class GetUserPostsController
  implements IController<IGetUserPostsUseCaseInput, Post[]>
{
  constructor(
    private readonly postsUseCase: GetUserPostsUseCase,
    private readonly validator: GetUserPostsValidator
  ) {}

  control(input: GetUserPostsRequest): Promise<Post[]> {
    this.validator.validate(input);

    return this.postsUseCase.execute(input);
  }
}
