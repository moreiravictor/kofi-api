import { IController } from "@/application/contracts/controller";
import { CommentOnPostRequest } from "@/application/contracts/requests";
import { CommentOnPostValidator } from "@/application/contracts/validator";
import { Comment } from "@/domain/models";
import { ICommentOnPostUseCase } from "@/domain/usecases";

export class CommentOnPostController
  implements IController<CommentOnPostRequest, Comment>
{
  constructor(
    private readonly commentUseCase: ICommentOnPostUseCase,
    private readonly validator: CommentOnPostValidator
  ) {}

  control(input: CommentOnPostRequest): Promise<Comment> {
    this.validator.validate(input);

    return this.commentUseCase.execute(input);
  }
}
