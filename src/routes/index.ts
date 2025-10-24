import { Router } from "express";
import userRoute from "@/routes/userRoutes";
import AuthRoute from "./authRoutes";
import bookRouter from "./bookRoutes";
import categoryRoute from "./categoryRoute";
import orderItemRoute from "./orderItemRoutes";

const router = Router();
// Order Routes
router.use("/order-items", orderItemRoute); // plural
// Auth Route
router.use("/", userRoute);

router.use("/", bookRouter);
router.use("/books", bookRouter);
router.use("/create-book", bookRouter);
router.use("/updated-book", bookRouter);
router.use("/delete-book", bookRouter);
router.use("/categories", categoryRoute);
// Auth route
router.use("/auth", AuthRoute);

export default router;
