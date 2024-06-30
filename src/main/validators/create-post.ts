import { PostType } from "@/domain/models";
import Joi from "joi";

export const createPostValidator = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  userId: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(PostType)),
  photos: Joi.array()
    .items(Joi.object({ url: Joi.string().required() }))
    .required(),
  topics: Joi.object({
    type: Joi.string().required(),
    ids: Joi.array().required(),
  }).required(),
});
