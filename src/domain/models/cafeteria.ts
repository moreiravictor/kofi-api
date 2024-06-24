import { Address } from "@/domain/models/address";
import { Post } from "@/domain/models/post";

export enum CafeteriaType {
  REGULAR = "regular",
  SPECIALTY = "specialty"
}

export interface Cafeteria {
  id: string;
  name: string;
  type: CafeteriaType;
  address: Address;
  posts: Post[];
}
