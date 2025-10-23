import { Router } from "express";
import userRoute from "@/routes/userRoutes";
import AuthRoute from "./authRoutes";
import bookRouter from "./bookRoutes";
import categoryRoute from "./categoryRoute";
import cartRoutes from "./cartRoutes";

const router = Router();

// router.use("/users/:id", userRoute);

// Auth Route
router.use("/", userRoute);

router.use("/", bookRouter);
router.use("/books", bookRouter);
router.use("/create-book", bookRouter);
router.use("/updated-book", bookRouter);
router.use("/delete-book", bookRouter);
router.use("/", categoryRoute);
router.use("/cart", cartRoutes);
// Auth route
router.use("/auth", AuthRoute);

export default router;
