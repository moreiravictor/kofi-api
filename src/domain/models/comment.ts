import { User } from "@/domain/models/user";

export interface Comment {
  id: string;
  content: string;
  user?: User;
}