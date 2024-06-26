import { Brand } from "@/domain/models/brand";
import { Photo } from "@/domain/models/photo";

export interface Coffee {
  id: string;
  name: string;
  roast: string;
  tasteNotes: string;
  elevation?: number;
  processingMethod?: string;
  generalGrade?: number;
  internalGrade: number;
  acidity: number;
  body: number;
  sweetness: number;
  afterTaste?: string;
  category: string;
  brand: Brand;
  photo?: Photo;
}
