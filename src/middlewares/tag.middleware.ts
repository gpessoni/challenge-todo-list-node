import { Request, Response, NextFunction } from "express";
import tagService from "../services/tag.service.ts";

export const validateTagExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tagId = req.params.id;
  const existingTag = await tagService.getTagById(tagId);

  if (!existingTag) {
    return res.status(404).json({ message: "Tag não encontrada." });
  }
  next();
};

