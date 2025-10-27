import { Request, Response } from "express";
import { createMultipleOrderItems } from "@/service/orderItemService";

export const createMultipleOrderItemsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const items = req.body.items; // array of items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    const result = await createMultipleOrderItems(items, userId);

    res.status(201).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order items", error: err.message });
  }
};
