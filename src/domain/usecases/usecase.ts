export interface IUsecase<U, T> {
  execute(input: U): T;
}