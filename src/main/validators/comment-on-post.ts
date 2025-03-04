import Joi from "joi";

export const CommentOnPostValidator = Joi.object({
  userId: Joi.string().required(),
  postId: Joi.string().required(),
  content: Joi.string().required(),
});
