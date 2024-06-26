import { Brand } from "@/domain/models/brand";
import { Photo } from "@/domain/models/photo";
import { Post } from "@/domain/models/post";

export enum GrinderType {
  HAND = "hand",
  ELECTRIC = "electric",
}

export interface Grinder {
  id: string;
  type: GrinderType;
  name: string;
  clicks: number;
  buildMaterial: string;
  weight: number;
  cutter: string | null;
  beanVolume: number | null;
  size: string | null;
  color: string | null;
  profilePhoto: Photo;
  brand: Brand;
  posts?: Post[];
}
