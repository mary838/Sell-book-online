import { Router } from "express";
import AuthRouter from "./authRoutes";
import bookRouter from "./bookRoutes";
import userRouter from "./userRoutes";
import categoryRoute from "./categoryRoute";
import orderItemRoute from "./orderItemRoutes";
import cartRoutes from "./cartRoutes";

const router = Router();

router.use("/", orderItemRoute);
router.use("/", categoryRoute);

router.use("/", bookRouter);

// Auth route
router.use("/auth", AuthRouter);

// Users Routes
router.use("/", userRouter);

// Cart route
router.use("/cart", cartRoutes);

export default router;

