import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signRouter from "./routers/signRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(signRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));