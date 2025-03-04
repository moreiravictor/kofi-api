import { Topic, TopicType } from "@/domain/models/topic";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetTopicsByTypePaginatedUseCaseInput {
  type: TopicType;
}

export interface IGetTopicsByTypePaginatedUseCase
  extends IUseCase<IGetTopicsByTypePaginatedUseCaseInput, Topic[]> {}
