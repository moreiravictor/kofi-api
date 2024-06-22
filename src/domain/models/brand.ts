import { Coffee } from "@/domain/models/coffee";

export interface Brand {
  id: string;
  legalName: string;
  tradingName: string;
  cnpj: string;
  coffees?: Coffee[]
}