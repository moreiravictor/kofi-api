import { Post } from "@/domain/models";
import { ICreatePostRepository } from "@/domain/repositories";
import { ICreatePostUseCase, ICreatePostUseCaseInput } from "@/domain/usecases";

export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: ICreatePostRepository) {}

  execute(input: ICreatePostUseCaseInput): Promise<Post> {
    return this.postRepository.create(input);
  }
}
