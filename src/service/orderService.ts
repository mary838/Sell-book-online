import { OrderModel } from "../models/orderModel";
import { Types } from "mongoose";
import { OrderItemModel } from "../models/orderItemModel";

// Create Order from existing OrderItem IDs
export const createOrderFromExistingItems = async (
  userId: string,
  orderItemIds: string[]
) => {
  if (!orderItemIds || orderItemIds.length === 0)
    throw new Error("No OrderItem IDs provided");

  // Fetch existing OrderItems
  const orderItems = await OrderItemModel.find({
    _id: { $in: orderItemIds },
  });

  if (orderItems.length === 0) throw new Error("No valid OrderItems found");

  const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Create the order
  const order = new OrderModel({
    userId,
    orderItems: orderItems.map((i) => i._id),
    totalPrice,
  });
  await order.save();

  // Link OrderItems to this Order
  await OrderItemModel.updateMany(
    { _id: { $in: orderItemIds } },
    { orderId: order._id }
  );

  return order.populate("orderItems");
};
