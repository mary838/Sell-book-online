import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  refreshtokenController
} from "@/controller/authController";
const AuthRouter = Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.post("/refresh", refreshtokenController);
AuthRouter.post("/logout", logoutController);

export default AuthRouter;
