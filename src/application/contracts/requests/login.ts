import { ILoginUseCaseInput } from "@/domain/usecases";

export interface LoginRequest {
  type: "internal" | "google";
  data: ILoginUseCaseInput;
}