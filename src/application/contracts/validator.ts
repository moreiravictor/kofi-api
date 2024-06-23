import { LoginRequest } from "@/application/contracts/requests/login";

export interface ValidatorInvalidResult {
  invalid: true;
  message: string;
}

export interface ValidatorValidResult {
  invalid: false;
}

export type ValidatorResult = ValidatorInvalidResult | ValidatorValidResult;

export interface Validator<T> {
  validate(input: T): ValidatorResult;
}

export type LoginValidator = Validator<LoginRequest>;

