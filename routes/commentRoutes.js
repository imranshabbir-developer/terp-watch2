import express from "express";
import { postComment, editComment, deleteComment } from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Post a comment
router.post("/:blogId", verifyToken, postComment);

// Edit a comment
router.put("/:blogId/:commentId", verifyToken, editComment);

// Delete a comment
router.delete("/:blogId/:commentId", verifyToken, deleteComment);

export default router;
