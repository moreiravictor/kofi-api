import { Brand } from "@/domain/models";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetTopBrandsUseCase extends IUseCase<void, Brand[]> {}
