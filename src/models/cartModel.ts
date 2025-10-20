import mongoose, { Schema, Document } from "mongoose";
import { ICart, ICartItem } from "../types/cart";

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const CartSchema = new Schema<ICart & Document>(
  {
    userId: { type: String, required: true, unique: true }, // One cart per user
    items: [CartItemSchema],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICart & Document>("Cart", CartSchema);
