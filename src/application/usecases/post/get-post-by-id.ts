import { PostNotFoundError } from "@/application/contracts/errors";
import { Post } from "@/domain/models";
import { IFindPostByIdRepository } from "@/domain/repositories/post";
import {
  IGetPostByIdUseCase,
  IGetPostByIdUseCaseInput,
} from "@/domain/usecases";

export class GetPostByIdUseCase implements IGetPostByIdUseCase {
  constructor(private readonly postRepository: IFindPostByIdRepository) {}

  async execute(input: IGetPostByIdUseCaseInput): Promise<Post> {
    const post = await this.postRepository.find(input.postId);

    if (!post) {
      throw new PostNotFoundError();
    }

    return post;
  }
}
