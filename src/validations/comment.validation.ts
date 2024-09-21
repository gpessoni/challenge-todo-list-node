import Joi from "joi";

const commentSchema = Joi.object({
  content: Joi.string().required().messages({
    "string.base": "O conteúdo deve ser uma string.",
    "string.empty": "O conteúdo é obrigatório.",
    "any.required": "O conteúdo é obrigatório.",
  }),
  taskId: Joi.string().uuid().required().messages({
    "string.base": "O ID da tarefa deve ser uma string.",
    "string.empty": "O ID da tarefa é obrigatório.",
    "any.required": "O ID da tarefa é obrigatório.",
  }),
});

const updateCommentSchema = Joi.object({
  content: Joi.string().messages({
    "string.base": "O conteúdo deve ser uma string.",
  }),
});

export { commentSchema, updateCommentSchema };
