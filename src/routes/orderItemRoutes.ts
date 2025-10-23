import express from "express";
import {
  createOrderItemController,
  getOrderItemsByOrderController,
} from "../controller/orderItemController";

const router = express.Router();

// Create a single OrderItem
router.post("/", createOrderItemController);

// Get all OrderItems by OrderId
router.get("/order/:orderId", getOrderItemsByOrderController);

export default router;
