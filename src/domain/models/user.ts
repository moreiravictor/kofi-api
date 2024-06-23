import { Address } from "@/domain/models/address";
import { Photo } from "@/domain/models/photo";
import { Post } from "@/domain/models/post";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  phone: string | null;
  address: Address | null;
  profilePhoto: Photo | null;
  posts: Post[];
}