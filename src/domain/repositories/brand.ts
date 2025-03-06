import { Brand } from "@/domain/models";

export interface IFindTopBrandsRepository {
  findTop(): Promise<Brand[]>;
}
