import { Request, Response, NextFunction } from "express";
import commentService from "../services/comment.service";
import taskService from "../services/task.service";

export const validateCommentExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.id;
  const existingComment = await commentService.getCommentById(commentId);

  if (!existingComment) {
    return res.status(404).json({ message: "Comentários Não encontrados" });
  }
  next();
};


export const validateTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId; 

  const existingTask = await taskService.getTaskById(taskId);

  if (!existingTask) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }

  next();
};
