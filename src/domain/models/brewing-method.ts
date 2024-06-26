import { Brand } from "@/domain/models/brand";
import { Photo } from "@/domain/models/photo";
import { Post } from "@/domain/models/post";

export interface BrewingMethod {
  id: string;
  name: string;
  profilePhoto: Photo;
  brand: Brand;
  posts?: Post[];
}
