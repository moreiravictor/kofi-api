import { PostType } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import Joi from "joi";

export const createPostValidator = Joi.object({
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
    type: Joi.string()
      .required()
      .valid(...Object.values(TopicType)),
    ids: Joi.array().required(),
  }).required(),
});
