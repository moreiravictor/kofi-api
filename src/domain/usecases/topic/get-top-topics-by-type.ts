import { Topic, TopicType } from "@/domain/models/topic";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetTopTopicsByTypeUseCaseInput {
  type: TopicType;
}

export interface IGetTopTopicsByTypeUseCase
  extends IUseCase<IGetTopTopicsByTypeUseCaseInput, Topic[]> {}
