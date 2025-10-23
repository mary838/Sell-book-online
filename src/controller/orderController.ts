import { Request, Response } from "express";
import * as orderService from "../service/orderService";

// Create Order from existing OrderItems
export const createOrderFromItemsController = async (req: Request, res: Response) => {
  try {
    const { userId, orderItemIds } = req.body;
    const order = await orderService.createOrderFromExistingItems(userId, orderItemIds);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
