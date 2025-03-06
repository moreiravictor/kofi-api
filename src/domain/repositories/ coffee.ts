import { Coffee } from "@/domain/models";

export type IInsertCoffeeRepositoryInput = Omit<Coffee, "brand"> & {
  brandId: string;
};

export interface IInsertCoffeeRepository {
  insert(input: IInsertCoffeeRepositoryInput): Promise<Coffee>;
}

export interface IFindTopCoffeesRepository {
  findTop(): Promise<Coffee[]>;
}
