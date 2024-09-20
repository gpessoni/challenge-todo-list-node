import { Request, Response } from "express";
import tagService from "../services/tag.service.ts";
import { tagSchema, updateTagSchema } from "../validations/tag.validation";
import { handleError } from "../utils/errorHandler";
import { validateTagExists } from "../middlewares/tag.middleware";

class TagController {
  async create(req: Request, res: Response) {
    const { error } = tagSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    if (await tagService.getTagByDescription(req.body.description)) {
      return res
        .status(400)
        .json({ message: "Tag com essa descrição já existe." });
    }

    try {
      const tag = await tagService.createTag(req.body);
      return res.status(201).json(tag);
    } catch (err) {
      return handleError(res, err, "Erro ao criar a tag.");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tags = await tagService.getTags();
      return res.json(tags);
    } catch (err) {
      return handleError(res, err, "Erro ao buscar as tags.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tag = await tagService.getTagById(req.params.id);
      return res.json(tag);
    } catch (err) {
      return handleError(res, err, "Erro ao buscar a tag.");
    }
  }

  async update(req: Request, res: Response) {
    const { error } = updateTagSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      const existingTag = await tagService.getTagById(req.params.id);
      if (!existingTag) return;

      if (
        req.body.description &&
        (await tagService.getTagByDescription(req.body.description))
      ) {
        return res
          .status(400)
          .json({ message: "Tag com essa descrição já existe." });
      }

      const updatedTag = await tagService.updateTag(req.params.id, req.body);
      return res.json(updatedTag);
    } catch (err) {
      return handleError(res, err, "Erro ao atualizar a tag.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await validateTagExists(req, res, () => {});
      await tagService.deleteTag(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err, "Erro ao deletar a tag.");
    }
  }
}

export default new TagController();
