import {OrderItemModel} from "../models/orderItemModel";

export interface OrderItemInput {
  orderId: string;
  bookId: string;
  quantity: number;
  sellPrice: number;
}

// Create a single OrderItem
export const createOrderItem = async (input: OrderItemInput) => {
  const totalPrice = input.quantity * input.sellPrice;
  const orderItem = new OrderItemModel({
    ...input,
    totalPrice,
  });
  await orderItem.save();
  return orderItem;
};

// Get OrderItem by ID
export const getOrderItemById = async (id: string) => {
  return OrderItemModel.findById(id).populate("bookId");
};

// Get all OrderItems for a specific order
export const getOrderItemsByOrderId = async (orderId: string) => {
  return OrderItemModel.find({ orderId }).populate("bookId");
};

// Delete an OrderItem
export const deleteOrderItem = async (id: string) => {
  return OrderItemModel.findByIdAndDelete(id);
};
