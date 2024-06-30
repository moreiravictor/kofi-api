import { Coffee } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import {
  IInsertCoffeeRepository,
  IInsertCoffeeRepositoryInput,
} from "@/domain/repositories/ coffee";
import { Prisma, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

type DBCoffee = Prisma.CoffeeGetPayload<{
  include: { Brand: true; Topic: { include: { Photo: true } } };
}>;

export class CoffeeRepository implements IInsertCoffeeRepository {
  constructor(private readonly db: PrismaClient) {}

  static fromDbToEntities(dbCoffees: DBCoffee[]): Coffee[] {
    return dbCoffees.map(CoffeeRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbCoffee: DBCoffee): Coffee {
    return {
      id: dbCoffee.Topic.id,
      name: dbCoffee.Topic.name,
      topicType: TopicType.COFFEE,
      photo: dbCoffee.Topic.Photo,
      brand: dbCoffee.Brand,
      acidity: dbCoffee.acidity,
      afterTaste: dbCoffee.afterTaste ?? undefined,
      body: dbCoffee.body,
      category: dbCoffee.category,
      elevation: dbCoffee.elevation ?? undefined,
      generalGrade: dbCoffee.generalGrade
        ? (dbCoffee.generalGrade as unknown as number)
        : undefined,
      internalGrade: dbCoffee.internalGrade ?? undefined,
      processingMethod: dbCoffee.processingMethod ?? undefined,
      roast: dbCoffee.roast,
      sweetness: dbCoffee.sweetness,
      tasteNotes: dbCoffee.tasteNotes,
    };
  }

  async insert(input: IInsertCoffeeRepositoryInput): Promise<Coffee> {
    const coffeeDb = await this.db.coffee.create({
      data: {
        acidity: input.acidity,
        body: input.body,
        category: input.category,
        internalGrade: input.internalGrade,
        roast: input.roast,
        sweetness: input.sweetness,
        tasteNotes: input.tasteNotes,
        afterTaste: input.afterTaste,
        elevation: input.elevation,
        generalGrade: input.generalGrade,
        id: randomUUID(),
        processingMethod: input.processingMethod,
        Brand: { connect: { id: input.brandId } },
        Topic: {
          create: {
            name: input.name,
            type: input.topicType,
            id: input.id,
            updatedAt: new Date(),
            createdAt: new Date(),
            Photo: { create: { id: input.photo.id, url: input.photo.url } },
          },
        },
      },
      include: { Brand: true, Topic: { include: { Photo: true } } },
    });

    return CoffeeRepository.fromDbToEntity(coffeeDb);
  }
}
