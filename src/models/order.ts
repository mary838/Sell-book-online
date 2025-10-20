import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
  bookId: Types.ObjectId;
  quantity: number;
  sellPrice: number;
  totalPrice: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }, // quantity * sellPrice
  },
  { _id: true }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const orderModel = model<IOrder>("Order", orderSchema);
export default orderModel;