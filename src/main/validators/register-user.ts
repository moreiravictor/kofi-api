import Joi from "joi";

export const registerUserValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});
