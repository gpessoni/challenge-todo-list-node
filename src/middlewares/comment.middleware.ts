import { Request, Response, NextFunction } from "express";
import commentService from "../services/comment.service";

export const validateCommentExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.id;
  const existingComment = await commentService.getCommentById(commentId);

  if (!existingComment) {
    return res.status(404).json({ message: "Comentário não encontrado." });
  }
  next();
};
