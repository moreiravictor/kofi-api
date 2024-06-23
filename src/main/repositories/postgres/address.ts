import { Address } from "@/domain/models/address";

export class AddressRepository {

  static fromEntityToDBUpdate(input: Address) {
    return {
          id: input.id,
          city: input.city,
          uf: input.uf,
          neighborhood: input.neighborhood,
          number: input.number,
          streetName: input.streetName,
          zipCode: input.zipCode,
          complement: input.complement,
          updatedAt: new Date(),
          deletedAt: null
        }
  }

  static fromEntityToDBCreate(input: Address) {
    return {
          id: input.id,
          city: input.city,
          uf: input.uf,
          neighborhood: input.neighborhood,
          number: input.number,
          streetName: input.streetName,
          zipCode: input.zipCode,
          complement: input.complement,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
  }
}