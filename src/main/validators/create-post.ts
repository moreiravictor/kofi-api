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
  topics: Joi.when("type", {
    // TODO think if it makes sense to have these rules on application level
    switch: [
      {
        is: PostType.REVIEW,
        then: Joi.object({
          type: Joi.string()
            .required()
            .valid(...Object.values(TopicType))
            .required(),
          ids: Joi.array().items(Joi.string().required()),
        }),
      },
      {
        is: [PostType.TIP, PostType.RECIPE],
        then: Joi.array()
          .items(
            Joi.object({
              type: Joi.string()
                .required()
                .valid(...Object.values(TopicType))
                .required(),
              id: Joi.string().required(),
            })
          )
          .min(1)
          .messages({
            "array.base":
              '"topics" must be an array when type is tip or recipe',
          }),
      },
      {
        is: PostType.COMPARISON,
        then: Joi.array()
          .items(
            Joi.object({
              type: Joi.string()
                .required()
                .valid(...Object.values(TopicType))
                .required(),
              id: Joi.string().required(),
            })
          )
          .min(2)
          .custom((items, helpers) => {
            const itemsAreSameType = items.every(
              (item: { type: TopicType }) => item.type === items[0].type
            );
            if (!itemsAreSameType) {
              return helpers.message({
                custom:
                  "All topics must be of the same type for comparison post",
              });
            }
          })
          .messages({
            "array.base": '"topics" must be an array when type is comparison',
          }),
      },
    ],
  }).required(),
});
