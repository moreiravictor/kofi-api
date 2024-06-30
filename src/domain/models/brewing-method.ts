import { Brand } from "@/domain/models/brand";
import { Topic, TopicType } from "@/domain/models/topic";

export interface BrewingMethod extends Topic {
  brand: Brand;
  topicType: TopicType.BREWING_METHOD;
}
