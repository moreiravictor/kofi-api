import { Post } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import {
  ICreatePostRepositoryInput,
  ICreatePostRepositoryInputTopics,
} from "@/domain/repositories";
import { IUseCase } from "@/domain/usecases/usecase";
import { OmitDeep } from "type-fest";

export type ICreatePostUseCaseInput = OmitDeep<
  ICreatePostRepositoryInput,
  "id" | "photos.0.id" | "comments" | "likesAmount" | "topics"
> & {
  topics: ICreatePostRepositoryInputTopics | { type: TopicType; ids: string[] };
};

export interface ICreatePostUseCase
  extends IUseCase<ICreatePostUseCaseInput, Post> {}
