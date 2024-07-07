import { LoginType } from "@/application/contracts/requests";
import Joi from "joi";

export const loginValidator = Joi.object({
  type: Joi.string()
    .required()
    .valid(...Object.values(LoginType)),
  data: Joi.when("type", {
    is: LoginType.GOOGLE,
    then: { idToken: Joi.string().required() },
    otherwise: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }).required(),
});
