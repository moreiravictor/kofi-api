import { IController } from "@/application/contracts/controller";
import { GetPostByIdValidator } from "@/application/contracts/validator";
import { GetPostByIdUseCase } from "@/application/usecases/post/get-post-by-id";
import { Post } from "@/domain/models";
import { IGetPostByIdUseCaseInput } from "@/domain/usecases";

export class GetPostByIdController
  implements IController<IGetPostByIdUseCaseInput, Post>
{
  constructor(
    private readonly postsUseCase: GetPostByIdUseCase,
    private readonly validator: GetPostByIdValidator
  ) {}

  control(input: IGetPostByIdUseCaseInput): Promise<Post> {
    this.validator.validate(input);

    return this.postsUseCase.execute(input);
  }
}
