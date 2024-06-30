import { Comment } from "@/domain/models/comment";
import { Photo } from "@/domain/models/photo";
import { PossibleTopic } from "@/domain/models/topic";
import { User } from "@/domain/models/user";

export enum PostType {
  TIP = "tip",
  REVIEW = "review",
  COMPARISON = "comparison",
  RECIPE = "recipe",
}

export interface Post {
  id: string;
  title: string;
  content: string;
  likesAmount: number;
  user: User;
  type: PostType;
  photos: Photo[];
  comments?: Comment[];
  topics: PossibleTopic[];
}
