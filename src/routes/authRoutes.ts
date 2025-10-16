import { Router } from "express";
import { registerController } from "@/controller/authController";

const authRouter = Router();

authRouter.post("/register", registerController);

export default authRouter;