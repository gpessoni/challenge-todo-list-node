import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "O título deve ser uma string.",
    "string.empty": "O título é obrigatório.",
    "any.required": "O título é obrigatório.",
  }),
  description: Joi.string().required().messages({
    "string.base": "A descrição deve ser uma string.",
    "string.empty": "A descrição é obrigatória.",
    "any.required": "A descrição é obrigatória.",
  }),
  status: Joi.string().valid("pending", "doing", "completed"),
  priority: Joi.string().valid("low", "medium", "high"),
  tags: Joi.array().items(Joi.string().uuid()),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "O título deve ser uma string.",
  }),
  description: Joi.string().messages({
    "string.base": "A descrição deve ser uma string.",
  }),
  status: Joi.string().valid("pending", "doing", "completed"),
  priority: Joi.string().valid("low", "medium", "high"),
  tags: Joi.array().items(Joi.string().uuid()),
});

export { taskSchema, updateTaskSchema };
