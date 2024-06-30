import { Brand } from "@/domain/models/brand";
import { Topic, TopicType } from "@/domain/models/topic";

export interface Coffee extends Topic {
  roast: string;
  tasteNotes: string;
  elevation?: number;
  processingMethod?: string;
  generalGrade?: number;
  internalGrade: number;
  acidity: number;
  body: number;
  sweetness: number;
  afterTaste?: string;
  category: string;
  brand: Brand;
  topicType: TopicType.COFFEE;
}
