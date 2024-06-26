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
    .items(
      Joi.object({ id: Joi.string().required(), url: Joi.string().required() })
    )
    .required(),
  coffeeIds: Joi.when("type", {
    is: PostType.REVIEW,
    then: Joi.array().length(1).items(Joi.string().required()),
  }),
});
