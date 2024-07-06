import { Address } from "@/domain/models/address";
import { Photo } from "@/domain/models/photo";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string | null; // possibly null for google sign in user
  phone: string | null;
  address: Address | null;
  profilePhoto: Photo | null;
}
