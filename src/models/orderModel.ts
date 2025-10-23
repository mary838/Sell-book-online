import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" }, // optional: pending, completed, canceled
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);

