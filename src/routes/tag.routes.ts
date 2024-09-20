import { Router } from "express";
import tagController from "../controllers/tag.controller";
import { validateTagExists } from "../middlewares/tag.middleware";

const router = Router();

router.post("/", tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", validateTagExists, tagController.getById);
router.put("/:id", validateTagExists, tagController.update);
router.delete("/:id", validateTagExists, tagController.delete);

export default router;
