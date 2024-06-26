import { IController } from "@/application/contracts/controller";
import { CreatePostRequest } from "@/application/contracts/requests";
import { CreatePostValidator } from "@/application/contracts/validator";
import { CreatePostUseCase } from "@/application/usecases/post";
import { Post } from "@/domain/models";

export class CreatePostController
  implements IController<CreatePostRequest, Post>
{
  constructor(
    private readonly postsUseCase: CreatePostUseCase,
    private readonly validator: CreatePostValidator
  ) {}

  control(input: CreatePostRequest): Promise<Post> {
    this.validator.validate(input);

    return this.postsUseCase.execute(input);
  }
}
