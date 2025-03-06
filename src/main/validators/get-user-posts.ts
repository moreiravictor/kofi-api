import Joi from "joi";

export const GetUserPostsValidator = Joi.object({
  userId: Joi.string().required(),
});
