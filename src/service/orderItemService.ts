import { OrderItem } from "@/models/orderItemModel";
import { Order } from "@/models/orderModel";
import CartItemModel from "@/models/cartIteamModel";
import mongoose from "mongoose";


 // Create order from cart items

export const createOrderFromCart = async (userId: string, orderId?: string) => {
  // Get all cart items for this user
  const cartItems = await CartItemModel.find({}).lean(); // Optional: filter by userId if added to schema
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }     

  // Create order if orderId not provided
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

  for (const cartItem of cartItems) {
    const orderItem = await OrderItem.create({
      orderId: new mongoose.Types.ObjectId(orderId),
      bookId: new mongoose.Types.ObjectId(cartItem.book),
      quantity: cartItem.quantity,
      price: cartItem.price,
      totalPrice: cartItem.quantity * cartItem.price,
    });

    totalOrderPrice += orderItem.totalPrice;
    createdItems.push(orderItem);
  }


  // Optional: clear cart after creating order
  await CartItemModel.deleteMany({});

  return { orderId, createdItems, totalOrderPrice };
};
