import CartModel from "@/models/cartModel";
import CartItemModel from "@/models/cartIteamModel";
import { updateCartTotal } from "./cartService";
import mongoose from "mongoose";

// add item to cart
export const addItemToCart = async (
  cartId: string,
  bookId: string,
  quantity: number,
  price: number
) => {
  const cart = await CartModel.findById(cartId);
  if (!cart) throw new Error("Cart not found");

  // create a new CartItem
  const cartItem = await CartItemModel.create({
    book: new mongoose.Types.ObjectId(bookId),
    quantity,
    price,
  });

  // push item into cart
  cart.items.push(cartItem._id);
  await cart.save();

  // recalc total
  await updateCartTotal(cartId);

  return await cart.populate("items");
};

// remove item from cart
export const removeItemFromCart = async (cartId: string, itemId: string) => {
  const cart = await CartModel.findById(cartId);
  if (!cart) throw new Error("Cart not found");

  // remove the item reference
  cart.items = cart.items.filter((id) => id.toString() !== itemId);
  await cart.save();

  // delete the CartItem document
  await CartItemModel.findByIdAndDelete(itemId);

  await updateCartTotal(cartId);

  return await cart.populate("items");
};

// update quantity
export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
) => {
  const item = await CartItemModel.findById(itemId);
  if (!item) throw new Error("Item not found");

  item.quantity = quantity;
  await item.save();

  // find the cart that has this item and update total
  const cart = await CartModel.findOne({ items: item._id });
  if (cart) await updateCartTotal(cart._id.toString());

  return item;
};
