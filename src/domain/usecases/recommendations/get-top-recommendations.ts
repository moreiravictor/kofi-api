import { Brand, Cafeteria, Coffee, Post } from "@/domain/models";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetTopRecommentationsOutPut {
  topBrands: Brand[];
  topCoffees: Coffee[];
  topCafeterias: Cafeteria[];
  topTips: Post[];
}

export interface IGetTopRecommendationsUseCase
  extends IUseCase<void, IGetTopRecommentationsOutPut> {}
