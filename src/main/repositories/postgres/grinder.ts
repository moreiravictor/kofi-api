import { Grinder, GrinderType } from "@/domain/models/grinder";
import { Prisma } from "@prisma/client";

export type DBGrinder = Prisma.GrinderGetPayload<{
  include: { Brand: true; Photo: true };
}>;

export class GrinderRepository {
  static fromDbToEntities(dbGrinders: DBGrinder[]): Grinder[] {
    return dbGrinders.map(GrinderRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbGrinder: DBGrinder): Grinder {
    return {
      id: dbGrinder.id,
      beanVolume: dbGrinder.beanVolume,
      brand: dbGrinder.Brand,
      buildMaterial: dbGrinder.buildMaterial,
      color: dbGrinder.color,
      clicks: dbGrinder.clicks,
      cutter: dbGrinder.cutter,
      name: dbGrinder.name,
      profilePhoto: dbGrinder.Photo,
      size: dbGrinder.size,
      type: dbGrinder.type as GrinderType,
      weight: dbGrinder.weight,
    };
  }
}
