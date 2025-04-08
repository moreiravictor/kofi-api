import { Post } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import {
  ICreatePostRepository,
  isICreatePostRepositoryInputTopics,
} from "@/domain/repositories";
import { ICreatePostUseCase, ICreatePostUseCaseInput } from "@/domain/usecases";
import { randomUUID } from "crypto";

export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: ICreatePostRepository) {}

  execute(input: ICreatePostUseCaseInput): Promise<Post> {
    if (isICreatePostRepositoryInputTopics(input.topics)) {
      return this.postRepository.create({
        ...input,
        topics: input.topics,
        id: randomUUID(),
        likesAmount: 0,
        photos: input.photos.map((photo) => ({
          id: randomUUID(),
          url: photo.url,
        })),
      });
    } else {
      return this.postRepository.create({
        ...input,
        topics: input.topics.ids.map((id) => ({
          type: (input.topics as { type: TopicType; ids: string[] }).type,
          id,
        })),
        id: randomUUID(),
        likesAmount: 0,
        photos: input.photos.map((photo) => ({
          id: randomUUID(),
          url: photo.url,
        })),
      });
    }
  }
}
