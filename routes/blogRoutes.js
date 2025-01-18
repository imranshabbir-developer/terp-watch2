import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
} from "../controllers/blogController.js";
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Blog CRUD Routes

// Public Route: Get all blogs
router.get("/", getBlogs);

// Public Route: Get a specific blog by ID
router.get("/:id", getBlogById);

// Protected Route: Create a new blog (admin or super-admin only)
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  upload.single("image"),
  createBlog
);

// Protected Route: Update an existing blog (admin or super-admin only)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  upload.single("image"),
  updateBlog
);

// Protected Route: Delete a blog (admin or super-admin only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  deleteBlog
);

// Protected Route: Like a blog (user, admin, or super-admin)
router.put(
  "/:id/like",
  verifyToken,
  authorizeRoles("user", "admin", "super-admin"),
  likeBlog
);

export default router;

