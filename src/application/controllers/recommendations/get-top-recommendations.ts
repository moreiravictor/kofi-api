import { IController } from "@/application/contracts/controller";
import { GetTopRecommentationsUseCase } from "@/application/usecases/recommendations/get-top-recommendations";
import { IGetTopRecommentationsOutPut } from "@/domain/usecases";

export class GetTopRecommendationsController
  implements IController<void, IGetTopRecommentationsOutPut>
{
  constructor(
    private readonly recommendationsUseCase: GetTopRecommentationsUseCase
  ) {}
  control(): Promise<IGetTopRecommentationsOutPut> {
    return this.recommendationsUseCase.execute();
  }
}
