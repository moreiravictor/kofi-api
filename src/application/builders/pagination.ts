import {
  IOptionalPaginationParams,
  IPaginationParams,
} from "@/domain/usecases/pagination";

export function buildPaginationParams(
  paginationParams: IOptionalPaginationParams
): IPaginationParams {
  const page = paginationParams.page ?? 1;
  const limit = Math.min(paginationParams.limit ?? 10, 100);

  return {
    page,
    limit,
  };
}
