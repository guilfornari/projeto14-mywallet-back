import { Router } from "express";
import { signUp, signIn } from "../controllers/authControllers.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";
import { signInValidation } from "../middlewares/singInValidation.js";

const signRouter = Router();
signRouter.post("/cadastro", signUpValidation, signUp);
signRouter.post("/", signInValidation, signIn);

export default signRouter;
