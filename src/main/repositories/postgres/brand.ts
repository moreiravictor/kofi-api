import { Brand } from "@/domain/models";
import { IFindTopBrandsRepository } from "@/domain/repositories/brand";
import { Prisma, PrismaClient } from "@prisma/client";

export type DBBrand = Prisma.BrandGetPayload<{}>;

export class BrandRepository implements IFindTopBrandsRepository {
  constructor(private readonly db: PrismaClient) {}

  static fromDbToEntities(brands: DBBrand[]): Brand[] {
    return brands.map(BrandRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbBrand: DBBrand): Brand {
    return { cnpj: dbBrand.cnpj, id: dbBrand.id, name: dbBrand.name };
  }

  async findTop(): Promise<Brand[]> {
    const brandsDb = await this.db.brand.findMany({
      take: 10,
      orderBy: { Coffees: { _count: "desc" } }, // TODO: define a better metric for top brand in the future
    });

    return BrandRepository.fromDbToEntities(brandsDb);
  }
}
