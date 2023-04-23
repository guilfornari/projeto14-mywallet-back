import { Router } from "express";
import { getOps, registerOps } from "../controllers/operationsControllers.js";
import operationsValidation from "../middlewares/operationsValidation.js";

const operationsRouter = Router();
operationsRouter.post("/nova-transacao/:tipo", operationsValidation, registerOps);
operationsRouter.get("/home", getOps)

export default operationsRouter;