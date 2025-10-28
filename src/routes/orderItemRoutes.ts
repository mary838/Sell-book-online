import express from "express";
import { createMultipleOrderItemsController } from "@/controller/orderItemController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = express.Router();

// POST /api/order-item/bulk
router.post("/order-items", authMiddleware, createMultipleOrderItemsController);

export default router;
