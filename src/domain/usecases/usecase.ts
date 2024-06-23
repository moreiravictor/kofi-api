export interface IUseCase<U, T> {
  execute(input: U): Promise<T>;
}