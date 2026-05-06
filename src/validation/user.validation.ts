import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(2).max(50),
  email: Joi.string().email().trim().lowercase(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).required(),
});