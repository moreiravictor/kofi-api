export interface IPaginated<T> {
  items: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface IOptionalPaginationParams {
  page?: number;
  limit?: number;
}

export type IWithOptionalPaginationParams<T extends object> = T &
  IOptionalPaginationParams;
