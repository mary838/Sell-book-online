import { Request, Response } from "express";
import { addItemToCartService, getCartService } from "@/service/cartService";

export const getCartController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    const userId = req.user.id;
    const result = await getCartService(userId);

    return res.status(result.success ? 200 : 404).json({
      success: result.success,
      data: result.data,
      message:
        result.message ||
        (result.success ? "Cart fetched successfully." : "Cart not found."),
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching cart.",
      data: null,
    });
  }
};

export const addItemToCartController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    const userId = req.user.id;
    const item = req.body;
    const result = await addItemToCartService(userId, item);

    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      data: result.data,
      message: result.success
        ? "Item added to cart successfully."
        : "Failed to add item.",
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding item to cart.",
      data: null,
    });
  }
};
