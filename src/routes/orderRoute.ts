import { Router } from "express";
import { createOrderService } from "@/service/orderService";
// import { authMiddleware } from "@/middleware/authMiddleware"; // assuming you have authentication

const router = Router();

// Create a new order
router.post("/orders", async (req, res) => {
  await createOrderService(req, res);
});

export default router;
