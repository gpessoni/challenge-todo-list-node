import { Request, Response } from "express";
import commentService from "../services/comment.service";
import { handleError } from "../utils/errorHandler";
import {
  commentSchema,
  updateCommentSchema,
} from "../validations/comment.validation";

class CommentController {
  async create(req: Request, res: Response) {
    const { error } = commentSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      const comment = await commentService.createComment(req.body);
      return res.status(201).json(comment);
    } catch (err) {
      return handleError(res, err, "Erro ao criar o comentário.");
    }
  }

  async getAllByTask(req: Request, res: Response) {
    try {
      const comments = await commentService.getCommentsByTask(
        req.params.taskId
      );
      return res.json(comments);
    } catch (err) {
      return handleError(res, err, "Erro ao buscar os comentários.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const comment = await commentService.getCommentById(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "Comentário não encontrado." });
      return res.json(comment);
    } catch (err) {
      return handleError(res, err, "Erro ao buscar o comentário.");
    }
  }

  async update(req: Request, res: Response) {
    const { error } = updateCommentSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      const updatedComment = await commentService.updateComment(
        req.params.id,
        req.body
      );
      return res.json(updatedComment);
    } catch (err) {
      return handleError(res, err, "Erro ao atualizar o comentário.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await commentService.deleteComment(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err, "Erro ao deletar o comentário.");
    }
  }
}

export default new CommentController();
