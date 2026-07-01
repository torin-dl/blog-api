import express from "express";
import path from "node:path";
import router from "./routes/router.js";
import passport from "passport";

const app = express();

app.use(express.json());

app.use("/", router);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
});
