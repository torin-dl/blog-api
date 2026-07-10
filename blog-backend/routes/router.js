import { Router } from "express";
import passport from "passport";
import BlogController from "../controllers/BlogController.js";

const router = Router();

router.get("/posts", BlogController.getPosts);
router.post("/posts", passport.authenticate("jwt", { session: false }), BlogController.createPost);
router.put("/posts/:postId", passport.authenticate("jwt", { session: false }), BlogController.editPost);
router.delete("/posts/:postId", passport.authenticate("jwt", { session: false }), BlogController.deletePost);

router.get("/posts/:postId/comments", BlogController.getComments);
router.post("/posts/:postId/comments", passport.authenticate("jwt", { session: false }), BlogController.createComment);

router.post("/auth/log-in", BlogController.logIn);
router.post("/auth/sign-up", BlogController.signUp);
router.get("/auth/log-out", BlogController.logOut);

export default router;
