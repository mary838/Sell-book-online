import { Router } from "express";
import { CartController } from "../controller/cartController";
import {
  authMiddleware,
  checkRoleMiddleware,
} from "../middleware/authMiddleware";

const router = Router();

// All cart routes require authentication and optionally a specific role
router.use(authMiddleware);
router.use(checkRoleMiddleware("user")); // Optional: Restrict to 'user' role; remove if not needed

router.get("/", CartController.getCart);
router.post("/add-item", CartController.addItem);
router.put("/update-item", CartController.updateItem);
router.delete("/remove-item/:productId", CartController.removeItem);

export default router;
