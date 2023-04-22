import express from "express";
import cors from "cors";
import signRouter from "./routers/authRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(signRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on portal ${PORT}, berk!`));