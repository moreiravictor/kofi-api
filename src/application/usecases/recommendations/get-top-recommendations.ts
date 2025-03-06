import { PostType } from "@/domain/models";
import { IFindTopPostsByTypeRepository } from "@/domain/repositories";
import { IFindTopCoffeesRepository } from "@/domain/repositories/ coffee";
import { IFindTopBrandsRepository } from "@/domain/repositories/brand";
import { IFindTopCafeteriasRepository } from "@/domain/repositories/cafeteria";
import {
  IGetTopRecommendationsUseCase,
  IGetTopRecommentationsOutPut,
} from "@/domain/usecases";

export class GetTopRecommentationsUseCase
  implements IGetTopRecommendationsUseCase
{
  constructor(
    private readonly coffeeRepository: IFindTopCoffeesRepository,
    private readonly cafeteriaRepository: IFindTopCafeteriasRepository,
    private readonly brandRepository: IFindTopBrandsRepository,
    private readonly postsRepository: IFindTopPostsByTypeRepository
  ) {}

  async execute(): Promise<IGetTopRecommentationsOutPut> {
    const topCoffees = await this.coffeeRepository.findTop();
    const topCafeterias = await this.cafeteriaRepository.findTop();
    const topBrands = await this.brandRepository.findTop();
    const topTips = await this.postsRepository.findTopByType(PostType.TIP);

    return { topBrands, topCafeterias, topCoffees, topTips };
  }
}
