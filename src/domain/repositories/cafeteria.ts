import { Cafeteria } from "@/domain/models";

export interface IFindTopCafeteriasRepository {
  findTop(): Promise<Cafeteria[]>;
}
