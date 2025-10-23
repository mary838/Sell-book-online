import mongoose from "mongoose";

interface ICartItem {
  productName: string;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  total: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
}
export default ICartItem;
