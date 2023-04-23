import express from "express";
import cors from "cors";
import signRouter from "./routers/authRouter.js";
import operationsRouter from "./routers/operationsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(signRouter);
app.use(operationsRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running on portal ${process.env.PORT}, berk!`);
});