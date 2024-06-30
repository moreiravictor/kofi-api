import { Brand } from "@/domain/models/brand";
import { Topic, TopicType } from "@/domain/models/topic";

export enum GrinderType {
  HAND = "hand",
  ELECTRIC = "electric",
}

export interface Grinder extends Topic {
  type: GrinderType;
  clicks: number;
  buildMaterial: string;
  weight: number;
  cutter: string | null;
  beanVolume: number | null;
  size: string | null;
  color: string | null;
  brand: Brand;
  topicType: TopicType.GRINDER;
}
