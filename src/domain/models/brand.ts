import { Photo } from "@/domain/models/photo";

export interface Brand {
  id: string;
  name: string;
  cnpj: string;
  photo: Photo | null;
}
