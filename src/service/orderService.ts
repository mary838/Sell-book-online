import { Request, Response } from "express";
import { orderModel } from "@/models/order";

// Create a new order
export const createOrderService = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { items } = req.body;

    // Validate user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required.",
      });
    }

    // Calculate total price
    const totalPrice = items.reduce(
      (sum, item) => sum + item.sellPrice * item.quantity,
      0
    );

    // Create the order
    const order = await orderModel.create({
      userId,
      items,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating order.",
    });
  }
};