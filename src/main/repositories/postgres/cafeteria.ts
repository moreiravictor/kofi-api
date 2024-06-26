import { Cafeteria, CafeteriaType } from "@/domain/models";
import { Prisma } from "@prisma/client";

export type DBCafeteria = Prisma.CafeteriaGetPayload<{
  include: { Address: true };
}>;

export class CafeteriaRepository {
  static fromDbToEntities(dbCafeterias: DBCafeteria[]): Cafeteria[] {
    return dbCafeterias.map(CafeteriaRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbCafeteria: DBCafeteria): Cafeteria {
    return {
      id: dbCafeteria.id,
      name: dbCafeteria.name,
      address: dbCafeteria.Address,
      type: dbCafeteria.type as CafeteriaType,
    };
  }
}
