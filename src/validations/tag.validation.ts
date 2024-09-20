import Joi from "joi";

const tagSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.base": "A descrição deve ser uma string.",
    "string.empty": "A descrição é obrigatória.",
    "any.required": "A descrição é obrigatória.",
  }),
  color: Joi.string()
    .required()
    .messages({
      "string.base": "A cor deve ser uma string.",
      "string.empty": "A cor é obrigatória.",
      "any.required": "A cor é obrigatória.",
    })
    .pattern(/^#([0-9A-F]{3}){1,2}$/i)
    .required(),
});

const updateTagSchema = Joi.object({
  description: Joi.string().messages({
    "string.base": "A descrição deve ser uma string.",
  }),
  color: Joi.string().messages({
    "string.base": "A cor deve ser uma string.",
  }),
});

export { tagSchema, updateTagSchema };
