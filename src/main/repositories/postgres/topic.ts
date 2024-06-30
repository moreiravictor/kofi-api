import { PossibleTopic } from "@/domain/models/topic";
import { BrewingMethodRepository } from "@/main/repositories/postgres/brewing-method";
import { CafeteriaRepository } from "@/main/repositories/postgres/cafeteria";
import { CoffeeRepository } from "@/main/repositories/postgres/coffee";
import { GrinderRepository } from "@/main/repositories/postgres/grinder";
import { Prisma } from "@prisma/client";

export type DBTopic = Prisma.TopicGetPayload<{
  include: {
    Photo: true;
    BrewingMethod: { include: { Brand: true } };
    Cafeteria: { include: { Address: true } };
    Coffee: { include: { Brand: true } };
    Grinder: { include: { Brand: true } };
  };
}>;

export class TopicRepository {
  static fromDbToEntities(dbTopic: DBTopic[]): PossibleTopic[] {
    return dbTopic.map(TopicRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbTopic: DBTopic): PossibleTopic {
    switch (dbTopic.type) {
      case "coffee":
        if (dbTopic.Coffee) {
          return CoffeeRepository.fromDbToEntity({
            ...dbTopic.Coffee,
            Topic: dbTopic,
          });
        }
      case "brewingMethod":
        if (dbTopic.BrewingMethod) {
          return BrewingMethodRepository.fromDbToEntity({
            ...dbTopic.BrewingMethod,
            Topic: dbTopic,
          });
        }
      case "cafeteria":
        if (dbTopic.Cafeteria) {
          return CafeteriaRepository.fromDbToEntity({
            ...dbTopic.Cafeteria,
            Topic: dbTopic,
          });
        }
      case "grinder":
        if (dbTopic.Grinder) {
          return GrinderRepository.fromDbToEntity({
            ...dbTopic.Grinder,
            Topic: dbTopic,
          });
        }
      default:
        throw new Error("Invalid topic type");
    }
  }
}
