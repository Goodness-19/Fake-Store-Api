import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(3).max(200).required(),
  category: Joi.string().max(50).required(),
  image: Joi.string().required(),
});