import express from "express";
import path from "node:path";
import router from "./routes/router.js";
import session from "express-session";
import { prisma } from "./lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();

app.use(express.json());

app.use(
    session({
        secret: "dogs",
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
        }),
    }),
);

app.use("/", router);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
});
