import { Photo } from "@/domain/models/photo";
import { Post } from "@/domain/models/post";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  phone: string | null;
  uf: string | null;
  city: string | null;
  photo: Photo | null;
  posts: Post[];
}