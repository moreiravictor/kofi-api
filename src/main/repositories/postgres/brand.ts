import { Brand } from "@/domain/models";
import { Prisma } from "@prisma/client";

export type DBBrand = Prisma.BrandGetPayload<{}>;

export class BrandRepository {
  static fromDbToEntities(brands: DBBrand[]): Brand[] {
    return brands.map(BrandRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbBrand: DBBrand): Brand {
    return { cnpj: dbBrand.cnpj, id: dbBrand.id, name: dbBrand.name };
  }
}
