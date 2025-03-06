import { GetTopRecommendationsController } from "@/application/controllers/recommendations/get-top-recommendations";
import { makeGetTopRecommendationsUseCase } from "@/main/factories/usecases/recommentations/get-top-recommendations";

export function makeGetTopRecommendationsController(): GetTopRecommendationsController {
  return new GetTopRecommendationsController(
    makeGetTopRecommendationsUseCase()
  );
}
