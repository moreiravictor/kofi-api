export interface IUsecase<U, T> {
  execute(input: U): Promise<T>;
}