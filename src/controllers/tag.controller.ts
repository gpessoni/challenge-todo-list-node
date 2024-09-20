import { Request, Response } from "express";
import tagService from "../services/tag.service.ts";
import { tagSchema, updateTagSchema } from "./../validations/tag.validation";

class TagController {
  async create(req: Request, res: Response) {
    const { error } = tagSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const existingTag = await tagService.getTagByDescription(
      req.body.description
    );
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "Uma tag com essa descrição já existe." });
    }

    try {
      console.log("Dados recebidos:", req.body);
      const tag = await tagService.createTag(req.body);
      res.status(201).json(tag);
    } catch (err: any) {
      console.error("Erro ao criar a tag:", err);
      res
        .status(500)
        .json({ message: "Erro ao criar a tag.", error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tags = await tagService.getTags();
      res.json(tags);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar as tags." });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tag = await tagService.getTagById(req.params.id);
      if (!tag) return res.status(404).json({ message: "Tag não encontrada." });
      res.json(tag);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar a tag." });
    }
  }

  async update(req: Request, res: Response) {
    const { error } = updateTagSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      const tag = await tagService.updateTag(req.params.id, req.body);
      if (!tag) return res.status(404).json({ message: "Tag não encontrada." });
      res.json(tag);
    } catch (err) {
      res.status(500).json({ message: "Erro ao atualizar a tag." });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const tag = await tagService.deleteTag(req.params.id);
      if (!tag) return res.status(404).json({ message: "Tag não encontrada." });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Erro ao deletar a tag." });
    }
  }
}

export default new TagController();
