import { Coffee } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import { Prisma } from "@prisma/client";

type DBCoffee = Prisma.CoffeeGetPayload<{
  include: { Brand: true; Topic: { include: { Photo: true } } };
}>;

export class CoffeeRepository {
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
}
