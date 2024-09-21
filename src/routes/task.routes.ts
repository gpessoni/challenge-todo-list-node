import { Router } from "express";
import taskController from "../controllers/task.controller";
import { validateTaskExists } from "../middlewares/task.middleware";

const router = Router();

router.post("/", taskController.create);
router.get("/", taskController.getAll);
router.get("/:id", validateTaskExists, taskController.getById);
router.put("/:id", validateTaskExists, taskController.update);
router.delete("/:id", validateTaskExists, taskController.delete);

export default router;
