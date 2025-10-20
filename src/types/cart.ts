export interface ICartItem {
  productId: string; // Reference to a Product model (assume you have one)
  quantity: number;
  price: number; // Price at the time of adding
}

export interface ICart {
  userId: string; // Reference to User model
  items: ICartItem[];
  total: number; // Calculated total price
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddItemRequest {
  productId: string;
  quantity: number;
  price: number;
}

export interface UpdateItemRequest {
  productId: string;
  quantity: number;
}
