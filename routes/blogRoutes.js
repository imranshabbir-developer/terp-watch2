import express from "express";
import { createBlog, getBlogs, likeBlog } from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", verifyToken, upload.single("image"), createBlog);
router.get("/", getBlogs);
router.put("/:id/like", verifyToken, likeBlog);

export default router;
