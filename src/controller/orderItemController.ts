import { Request, Response } from "express";
import { createOrderFromCart } from "@/service/orderItemService";

export const createOrderFromCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // make sure you have auth middleware
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await createOrderFromCart(userId);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
