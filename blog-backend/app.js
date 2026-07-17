import express from "express";
import path from "node:path";
import router from "./routes/router.js";
import passport from "passport";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", router);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
});
