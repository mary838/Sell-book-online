import Cart from "../models/cartModel";
import {
  ICart,
  ICartItem,
  AddItemRequest,
  UpdateItemRequest,
} from "../types/cart";

export class CartService {
  // Get cart by user ID
  static async getCart(userId: string): Promise<ICart | null> {
    return await Cart.findOne({ userId });
  }

  // Add item to cart
  static async addItem(userId: string, item: AddItemRequest): Promise<ICart> {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push(item as ICartItem);
    }

    cart.total = this.calculateTotal(cart.items);
    return await cart.save();
  }

  // Update item quantity
  static async updateItem(
    userId: string,
    item: UpdateItemRequest
  ): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });
    if (!cart) return null;

    const existingItem = cart.items.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity = item.quantity;
      cart.total = this.calculateTotal(cart.items);
      return await cart.save();
    }
    return null;
  }

  // Remove item from cart
  static async removeItem(
    userId: string,
    productId: string
  ): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });
    if (!cart) return null;

    cart.items = cart.items.filter((i) => i.productId !== productId);
    cart.total = this.calculateTotal(cart.items);
    return await cart.save();
  }

  // Helper: Calculate total price
  private static calculateTotal(items: ICartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
