import express from "express";
import { createOrderFromItemsController } from "../controller/orderController";

const router = express.Router();

// Create Order from existing OrderItem IDs
router.post("/create-from-items", createOrderFromItemsController);

export default router;
