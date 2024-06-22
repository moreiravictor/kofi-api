import { IController } from "@/application/contracts/controller";
import { GetLatestPostsUseCase } from "@/application/usecases";
import { Post, PostType } from "@/domain/models/post";

export class GetLatestPostsController implements IController<PostType, Post[]> {

  constructor(private readonly postsUseCase: GetLatestPostsUseCase) {}

  control(type: PostType): Promise<Post[]> {
    return this.postsUseCase.execute(type);
  }

}