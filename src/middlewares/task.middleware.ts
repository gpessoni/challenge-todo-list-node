import { Request, Response, NextFunction } from "express";
import taskService from "../services/task.service";

export const validateTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.id;
  const existingTask = await taskService.getTaskById(taskId);

  if (!existingTask) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }
  next();
};
