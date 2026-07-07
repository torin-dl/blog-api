import { Router } from "express";
import passport from "passport";
import BlogController from "../controllers/BlogController";

const router = Router();

router.get("/posts", BlogController.getPosts);
router.post("/posts", passport.authenticate("jwt", { session: false }), BlogController.createPost);
router.put("/posts/:postId", passport.authenticate("jwt", { session: false }), BlogController.editPost);
router.delete("/posts/:postId", passport.authenticate("jwt", { session: false }), BlogController.deletePost);

router.get("/posts/:postId/comments", BlogController.getComments);
router.post("/posts/:postId/comments", passport.authenticate("jwt", { session: false }), BlogController.createComment);

router.post("/auth/login");
router.post("/auth/register");
router.get("/auth/logout");
