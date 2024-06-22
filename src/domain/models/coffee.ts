import { Brand } from "@/domain/models/brand";
import { Photo } from "@/domain/models/photo";

export interface Coffee {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  roast: string;
  tasteNotes: string;
  elevation: number;
  processingMethod: string;
  generalGrade: number;
  internalGrade: number;
  acidity: number;
  body: number;
  sweetness: number;
  afterTaste: string;
  category: string;
  brandId: string;
  brand: Brand;
  photo: Photo;
}