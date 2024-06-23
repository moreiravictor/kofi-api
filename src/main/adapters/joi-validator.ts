import { BadRequestError } from "@/application/contracts/errors";
import {
  type RequestValidator,
} from "@/application/contracts/validator";
import type { ObjectSchema, StringSchema } from "joi";

export class JoiValidator<T> implements RequestValidator<T> {
  constructor(private readonly joiSchema: ObjectSchema<T> | StringSchema<T>) {}

  validate(payload: T) {
    const errorMessage = this.joiSchema
      .validate(payload, { allowUnknown: true, abortEarly: false })
      .error?.details.map((g) => g.message)
      .join(", ");

    if (errorMessage) {
      throw new BadRequestError(errorMessage);
    }
  }
}
