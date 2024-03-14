import express from "express";
import { getFeedPosts, getUserPosts, likePost, saveComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

// Comment POST
router.post("/:id/comment", verifyToken, saveComment);

export default router;