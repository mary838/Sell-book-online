import mongoose, { Model } from "mongoose";
import CartItemSchema from "./cartIteamModel";
import { ICart } from "../types/cartType";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One cart per user
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const cartModel: Model<ICart> = mongoose.model<ICart>(
  "Cart",
  CartSchema
);
