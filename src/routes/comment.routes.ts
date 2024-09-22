import { Router } from "express";
import commentController from "../controllers/comment.controller";
import { validateCommentExists, validateTaskExists } from "../middlewares/comment.middleware";

const router = Router();

router.post("/", commentController.create); 
router.get("/task/:taskId", validateTaskExists, commentController.getAllByTask); 
router.get("/:id", validateCommentExists, commentController.getById); 
router.put("/:id", validateCommentExists, commentController.update); 
router.delete("/:id", validateCommentExists, commentController.delete); 
export default router;
