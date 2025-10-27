import CartModel from "@/models/cartModel";
import mongoose from "mongoose";

// find or create a cart by user ID
export const findOrCreateCart = async (userId: string) => {
  let cart = await CartModel.findOne({ user: userId }).populate("items");
  if (!cart) {
    cart = await CartModel.create({ user: userId, items: [], totalAmount: 0 });
  }
  return cart;
};

// get cart by ID
export const getCartById = async (cartId: string) => {
  const cart = await CartModel.findById(cartId).populate("items");
  if (!cart) throw new Error("Cart not found");
  return cart;
};

// recalculate total amount
export const updateCartTotal = async (cartId: string) => {
  const cart = await CartModel.findById(cartId).populate("items");
  if (!cart) throw new Error("Cart not found");

  const total = cart.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  cart.totalAmount = total;
  await cart.save();
  return cart;
};
