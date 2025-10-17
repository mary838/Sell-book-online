import { Router } from "express";
import AuthRouter from "./authRoute";
import bookRouter from "./bookRoutes";
import categoryRoute from "./categoryRoute";
const router = Router();

router.use("/", bookRouter);
router.use("/books", bookRouter);
router.use("/create-book", bookRouter);
router.use("/updated-book", bookRouter);
router.use("/delete-book", bookRouter);
router.use("/categories", categoryRoute);
// Auth route
router.use("/auth", AuthRouter);

export default router;
