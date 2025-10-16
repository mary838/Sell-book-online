import { Router } from "express";
import bookRoute from "./bookRoute";
import authRoute from "./authRoutes";

const router = Router();

router.use("/books", bookRoute);

// Auth Route
router.use("/auth", authRoute);

export default router;
