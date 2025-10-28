import { OrderItem } from "@/models/orderItemModel";
import { Order } from "@/models/orderModel";
import mongoose from "mongoose";

interface OrderItemInput {
  bookId: string;
  quantity: number;
  price: number;
}

// Single order item creation (optional)
export const createOrderItemAuto = async (item: OrderItemInput, userId: string, orderId?: string) => {
  if (!item.bookId || item.quantity == null || item.price == null) {
    throw new Error("Missing required fields for OrderItem");
  }

  // Create order if not provided
  if (!orderId) {
    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      totalPrice: 0,
      orderItems: [],
    });
    orderId = order._id.toString();
  }

  const orderItem = await OrderItem.create({
    orderId: new mongoose.Types.ObjectId(orderId),
    bookId: new mongoose.Types.ObjectId(item.bookId),
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.price * item.quantity,
  });

  // Update order
  await Order.findByIdAndUpdate(orderId, {
    $push: { orderItems: orderItem._id },
    $inc: { totalPrice: orderItem.totalPrice },
  });

  return orderItem;
};

// ✅ Export multiple order items function
export const createMultipleOrderItems = async (
  items: OrderItemInput[],
  userId: string,
  orderId?: string
) => {
  if (!items || items.length === 0) {
    throw new Error("No order items provided");
  }

  if (!orderId) {
    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      totalPrice: 0,
      orderItems: [],
    });
    orderId = order._id.toString();
  }

  let totalOrderPrice = 0;
  const createdItems = [];

  for (const item of items) {
    if (!item.bookId || item.quantity == null || item.price == null) {
      throw new Error("Missing required fields in one of the order items");
    }

    const orderItem = await OrderItem.create({
      orderId: new mongoose.Types.ObjectId(orderId),
      bookId: new mongoose.Types.ObjectId(item.bookId),
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.price * item.quantity,
    });

    totalOrderPrice += orderItem.totalPrice;
    createdItems.push(orderItem);
  }

  await Order.findByIdAndUpdate(orderId, {
    $push: { orderItems: { $each: createdItems.map(i => i._id) } },
    $inc: { totalPrice: totalOrderPrice },
  });

  return { orderId, createdItems, totalOrderPrice };
};
