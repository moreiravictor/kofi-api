import { Cafeteria, CafeteriaType } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import { IFindTopCafeteriasRepository } from "@/domain/repositories/cafeteria";
import { Prisma, PrismaClient } from "@prisma/client";

export type DBCafeteria = Prisma.CafeteriaGetPayload<{
  include: { Address: true; Topic: { include: { Photo: true } } };
}>;

export class CafeteriaRepository implements IFindTopCafeteriasRepository {
  constructor(private readonly db: PrismaClient) {}

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

  async findTop(): Promise<Cafeteria[]> {
    const cafeteriasDb = await this.db.topic.findMany({
      take: 10,
      where: { type: "cafeteria", Cafeteria: { isNot: null } },
      select: {
        Cafeteria: {
          include: { Address: true, Topic: { include: { Photo: true } } },
        },
      },
      orderBy: { Post: { _count: "desc" } },
    });

    const cafeterias = cafeteriasDb
      .map((c) => c.Cafeteria)
      .filter((c) => c !== null);

    return CafeteriaRepository.fromDbToEntities(cafeterias);
  }
}
