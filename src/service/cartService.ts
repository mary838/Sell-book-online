import { cartModel } from "@/models/cartModel";
import ICartItem from "@/types/cartType";
import "@/models/bookModel";

export const getCartService = async (userId: string) => {
  const cart = await cartModel.findOne({ userId }).populate("items.productId");

  if (!cart) {
    return { success: false, message: "Cart not found", data: null };
  }
  return { success: true, data: cart };
};

export const addItemToCartService = async (userId: string, item: ICartItem) => {
  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({
      userId,

      items: [item],
      totalPrice: item.price * item.quantity,
    });
  } else {
    const existingItem = cart.items.find(
      (i) => i.productId.toString() === item.productId.toString()
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }

  await cart.save();
  return { success: true, data: cart };
};
