import { Comment } from "@/domain/models/comment";
import { Photo } from "@/domain/models/photo";
import { User } from "@/domain/models/user";

export enum PostType {
  TIP = "TIP",
  REVIEW = "REVIEW"
}

export interface Post {
  id: string;
  title: string;
  content: string;
  likeAmount: number;
  user?: User;
  type: PostType;
  photos:     Photo[];
  comments: Comment[];
}