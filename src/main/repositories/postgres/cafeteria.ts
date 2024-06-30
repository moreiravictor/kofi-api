import { Cafeteria, CafeteriaType } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import { Prisma } from "@prisma/client";

export type DBCafeteria = Prisma.CafeteriaGetPayload<{
  include: { Address: true; Topic: { include: { Photo: true } } };
}>;

export class CafeteriaRepository {
  static fromDbToEntities(dbCafeterias: DBCafeteria[]): Cafeteria[] {
    return dbCafeterias.map(CafeteriaRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbCafeteria: DBCafeteria): Cafeteria {
    return {
      id: dbCafeteria.Topic.id,
      name: dbCafeteria.Topic.name,
      address: dbCafeteria.Address,
      type: dbCafeteria.type as CafeteriaType,
      photo: dbCafeteria.Topic.Photo,
      topicType: TopicType.CAFETERIA,
    };
  }
}
