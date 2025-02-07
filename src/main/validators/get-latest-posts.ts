import { PostType } from "@/domain/models";
import Joi from "joi";

export const GetLatestPostsValidator = Joi.object({
  type: Joi.string().valid(...Object.values(PostType)),
  limit: Joi.number().integer(),
  page: Joi.number().integer(),
});
