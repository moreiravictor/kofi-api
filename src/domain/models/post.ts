import { BrewingMethod } from "@/domain/models/brewing-method";
import { Cafeteria } from "@/domain/models/cafeteria";
import { Coffee } from "@/domain/models/coffee";
import { Comment } from "@/domain/models/comment";
import { Grinder } from "@/domain/models/grinder";
import { Photo } from "@/domain/models/photo";
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
  coffees?: Coffee[];
  grinders?: Grinder[];
  brewingMethods?: BrewingMethod[];
  cafeterias?: Cafeteria[];
}
