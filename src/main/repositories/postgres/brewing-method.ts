import { BrewingMethod } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import { Prisma } from "@prisma/client";

export type DBBrewingMethod = Prisma.BrewingMethodGetPayload<{
  include: { Brand: true; Topic: { include: { Photo: true } } };
}>;
export class BrewingMethodRepository {
  static fromDbToEntities(dbMethods: DBBrewingMethod[]): BrewingMethod[] {
    return dbMethods.map(BrewingMethodRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbMethod: DBBrewingMethod): BrewingMethod {
    return {
      id: dbMethod.Topic.id,
      brand: dbMethod.Brand,
      name: dbMethod.Topic.name,
      topicType: TopicType.BREWING_METHOD,
      photo: dbMethod.Topic.Photo,
    };
  }
}
