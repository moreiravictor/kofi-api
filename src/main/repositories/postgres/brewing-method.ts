import { BrewingMethod } from "@/domain/models";
import { Prisma } from "@prisma/client";

export type DBBrewingMethod = Prisma.BrewingMethodGetPayload<{
  include: { Brand: true; Photo: true };
}>;
export class BrewingMethodRepository {
  static fromDbToEntities(dbMethods: DBBrewingMethod[]): BrewingMethod[] {
    return dbMethods.map(BrewingMethodRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbMethod: DBBrewingMethod): BrewingMethod {
    return {
      id: dbMethod.id,
      name: dbMethod.name,
      profilePhoto: dbMethod.Photo,
      brand: dbMethod.Brand,
    };
  }
}
