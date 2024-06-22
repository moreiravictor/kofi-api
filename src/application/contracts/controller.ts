export interface IController<U, T> {
  control(input: U): Promise<T>;
}