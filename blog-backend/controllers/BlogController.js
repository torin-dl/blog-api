import bcrypt from "bcrypt";
import passport from "../config/passport.js";
import { prisma } from "../lib/prisma.js";

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

export default {
    getPosts,
    createPost,
    editPost,
    deletePost,
    getComments,
    createComment,
};
