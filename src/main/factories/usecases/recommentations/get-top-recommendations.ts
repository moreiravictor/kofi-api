import { GetTopRecommentationsUseCase } from "@/application/usecases/recommendations/get-top-recommendations";
import db from "@/main/common/postgres/client";
import { BrandRepository } from "@/main/repositories/postgres/brand";
import { CafeteriaRepository } from "@/main/repositories/postgres/cafeteria";
import { CoffeeRepository } from "@/main/repositories/postgres/coffee";
import { PostRepository } from "@/main/repositories/postgres/post";

export function makeGetTopRecommendationsUseCase(): GetTopRecommentationsUseCase {
  return new GetTopRecommentationsUseCase(
    new CoffeeRepository(db),
    new CafeteriaRepository(db),
    new BrandRepository(db),
    new PostRepository(db)
  );
}
