import { Address } from "@/domain/models/address";
import { Topic, TopicType } from "@/domain/models/topic";

export enum CafeteriaType {
  REGULAR = "regular",
  SPECIALTY = "specialty",
}

export interface Cafeteria extends Topic {
  type: CafeteriaType;
  address: Address;
  topicType: TopicType.CAFETERIA;
}
