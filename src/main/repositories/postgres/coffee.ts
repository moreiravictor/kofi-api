import { Coffee } from "@/domain/models";
import { Prisma } from "@prisma/client";

type DBCoffee = Prisma.CoffeeGetPayload<{
  include: { Brand: true; Photo: true };
}>;

export class CoffeeRepository {
  static fromDbToEntities(dbCoffees: DBCoffee[]): Coffee[] {
    return dbCoffees.map(CoffeeRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbCoffee: DBCoffee): Coffee {
    return {
      id: dbCoffee.id,
      name: dbCoffee.name,
      brand: dbCoffee.Brand,
      photo: dbCoffee.Photo ?? undefined,
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
