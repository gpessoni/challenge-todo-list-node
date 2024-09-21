import { Request, Response } from "express";
import taskService from "../services/task.service";
import { handleError } from "../utils/errorHandler";
import { taskSchema, updateTaskSchema } from "../validations/task.validation";

class TaskController {
  async create(req: Request, res: Response) {
    const { error } = taskSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      const task = await taskService.createTask(req.body);
      return res.status(201).json(task);
    } catch (err) {
      return handleError(res, err, "Erro ao criar a tarefa.");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await taskService.getTasks();
      return res.json(tasks);
    } catch (err) {
      return handleError(res, err, "Erro ao buscar as tarefas.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task)
        return res.status(404).json({ message: "Tarefa não encontrada." });
      return res.json(task);
    } catch (err) {
      return handleError(res, err, "Erro ao buscar a tarefa.");
    }
  }

  async update(req: Request, res: Response) {
    const { error } = updateTaskSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      const updatedTask = await taskService.updateTask(req.params.id, req.body);
      return res.json(updatedTask);
    } catch (err) {
      return handleError(res, err, "Erro ao atualizar a tarefa.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await taskService.deleteTask(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err, "Erro ao deletar a tarefa.");
    }
  }
}

export default new TaskController();
