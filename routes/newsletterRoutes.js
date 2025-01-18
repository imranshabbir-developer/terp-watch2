import express from "express";
import { subscribe, getSubscribers, deleteSubscriber } from "../controllers/newsletterController.js";
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Route: Subscribe to the newsletter
router.post("/subscribe", subscribe);

// Protected Route: Get all subscribers (only admin and super-admin)
router.get("/", verifyToken, authorizeRoles("admin", "super-admin"), getSubscribers);

// Protected Route: Delete a subscriber by ID (only admin and super-admin)
router.delete("/:id", verifyToken, authorizeRoles("admin", "super-admin"), deleteSubscriber);

export default router;
