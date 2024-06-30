import { Post } from "@/domain/models";
import { ICreatePostRepository } from "@/domain/repositories";
import { ICreatePostUseCase, ICreatePostUseCaseInput } from "@/domain/usecases";
import { randomUUID } from "crypto";

export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: ICreatePostRepository) {}

  execute(input: ICreatePostUseCaseInput): Promise<Post> {
    return this.postRepository.create({
      ...input,
      id: randomUUID(),
      likesAmount: 0,
      photos: input.photos.map((photo) => ({
        id: randomUUID(),
        url: photo.url,
      })),
    });
  }
}
