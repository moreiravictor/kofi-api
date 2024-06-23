import Joi from "joi";

export const updateUserValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    phone: Joi.string().required(),
    profilePhoto: Joi.object({
      id: Joi.string().required(),
      url: Joi.string().required()
    }).optional(),
    address: Joi.object({
      id: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().required(),
      neighborhood: Joi.string().optional(),
      number: Joi.string().optional(),
      streetName: Joi.string().optional(),
      zipCode: Joi.string().optional(),
      complement: Joi.string().optional()
    }).optional()
});
