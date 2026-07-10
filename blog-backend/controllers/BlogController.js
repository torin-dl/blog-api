import bcrypt from "bcrypt";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";

async function getPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                comments: true,
            },
        });
        res.status(201).json(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function createPost(req, res, next) {
    try {
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                body: req.body.body,
                published: req.body.published,
                userId: req.user.id,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function editPost(req, res, next) {
    try {
        const post = await prisma.post.update({
            where: { id: parseInt(req.params.id) },
            data: {
                title: req.body.title,
                body: req.body.body,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function deletePost(req, res, next) {
    try {
        await prisma.post.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getComments(req, res, next) {
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(req.params.id) },
            include: {
                user: true,
                post: false,
            },
        });
        res.status(201).json(comments);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function createComment(req, res, next) {
    try {
        const comment = await prisma.comment.create({
            data: {
                body: req.body.body,
                userId: req.user.id,
                postId: parseInt(req.params.id),
            },
        });
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function signUp(req, res, next) {
    try {
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });

        const payload = { id: user.id, username: user.username, role: user.role };
        const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
        res.json({ success: true, token: "Bearer " + token });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function logIn(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message || "Invalid credentials" });

        const payload = { id: user.id, username: user.username, role: user.role };
        const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
        res.json({ success: true, token: "Bearer " + token });
    })(req, res, next);
}

function logOut(req, res, next) {
    res.status(200).json({ success: true, message: "Logout successful" });
}

export default {
    getPosts,
    createPost,
    editPost,
    deletePost,
    getComments,
    createComment,
    signUp,
    logIn,
    logOut,
};
