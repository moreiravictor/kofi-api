import { Grinder, GrinderType } from "@/domain/models/grinder";
import { TopicType } from "@/domain/models/topic";
import { Prisma } from "@prisma/client";

export type DBGrinder = Prisma.GrinderGetPayload<{
  include: { Brand: true; Topic: { include: { Photo: true } } };
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
      name: dbGrinder.Topic.name,
      topicType: TopicType.GRINDER,
      photo: dbGrinder.Topic.Photo,
      size: dbGrinder.size,
      type: dbGrinder.type as GrinderType,
      weight: dbGrinder.weight,
    };
  }
}
