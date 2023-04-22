import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";

const signRouter = Router();
signRouter.post("/cadastro", signUpValidation, signUp);
export default signRouter;