import { Request, Response } from "express";
import * as orderItemService from "../service/orderItemService";

// Create OrderItem
export const createOrderItemController = async (req: Request, res: Response) => {
  try {
    const item = await orderItemService.createOrderItem(req.body);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all OrderItems for an order
export const getOrderItemsByOrderController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const items = await orderItemService.getOrderItemsByOrderId(orderId);
    res.json(items);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
