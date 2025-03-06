import Joi from "joi";

export const GetPostByIdValidator = Joi.object({
  postId: Joi.string().required(),
});
