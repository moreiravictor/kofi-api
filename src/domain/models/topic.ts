import { BrewingMethod } from "@/domain/models/brewing-method";
import { Cafeteria } from "@/domain/models/cafeteria";
import { Coffee } from "@/domain/models/coffee";
import { Grinder } from "@/domain/models/grinder";
import { Photo } from "@/domain/models/photo";
import { Post } from "@/domain/models/post";

export enum TopicType {
  COFFEE = "coffee",
  GRINDER = "grinder",
  BREWING_METHOD = "brewingMethod",
  CAFETERIA = "cafeteria",
}

export interface Topic {
  id: string;
  name: string;
  photo: Photo;
  posts?: Post[];
  topicType: TopicType;
}

export type PossibleTopic =
  | ({ topicType: TopicType.GRINDER } & Grinder)
  | ({ topicType: TopicType.COFFEE } & Coffee)
  | ({ topicType: TopicType.BREWING_METHOD } & BrewingMethod)
  | ({ topicType: TopicType.CAFETERIA } & Cafeteria);
