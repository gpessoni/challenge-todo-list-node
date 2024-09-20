import { Router } from "express";
import tagController from "../controllers/tag.controller";
const router = Router();

router.post("/", tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", tagController.getById);
router.put("/:id", tagController.update);
router.delete("/:id", tagController.delete);

export default router;
