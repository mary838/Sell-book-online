import { Request, Response } from "express";
import { CartService } from "../service/cartService";
import { AddItemRequest, UpdateItemRequest } from "../types/cart";

export class CartController {
  // Get user's cart
  static async getCart(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized." });
      }
      const cart = await CartService.getCart(req.user.id);
      if (!cart)
        return res
          .status(404)
          .json({ success: false, message: "Cart not found" });
      res.json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Add item to cart
  static async addItem(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized." });
      }
      const item: AddItemRequest = req.body;
      const cart = await CartService.addItem(req.user.id, item);
      res.status(201).json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Update item in cart
  static async updateItem(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized." });
      }
      const item: UpdateItemRequest = req.body;
      const cart = await CartService.updateItem(req.user.id, item);
      if (!cart)
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      res.json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Remove item from cart
  static async removeItem(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized." });
      }
      const { productId } = req.params;
      const cart = await CartService.removeItem(req.user.id, productId);
      if (!cart)
        return res
          .status(404)
          .json({ success: false, message: "Cart or item not found" });
      res.json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}
