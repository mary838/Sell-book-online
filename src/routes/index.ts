import { Router } from "express";
import userRoute from "@/routes/userRoutes";
import authRoute from "./authRoutes";

const router = Router();

// router.use("/users/:id", userRoute);

// Auth Route
router.use("/auth", authRoute);
router.use("/users", userRoute);


export default router;
