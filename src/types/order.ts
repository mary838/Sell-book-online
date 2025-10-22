import { ObjectId } from "mongodb";


export class OrderItem {
  id: ObjectId;
  orderId: ObjectId;
  bookId: ObjectId;
  quantity: number;
  totalPrice: number; // totalPrice = quantity * sellPrice
  sellPrice: number;

  constructor(
    orderId: ObjectId,
    bookId: ObjectId,
    quantity: number,
    sellPrice: number
  ) {
    this.id = new ObjectId();
    this.orderId = orderId;
    this.bookId = bookId;
    this.quantity = quantity;
    this.sellPrice = sellPrice;
    this.totalPrice = quantity * sellPrice;
  }
}
// Represents the main order
export class Order {
  id: ObjectId;
  userId: ObjectId;
  orderItemIds: ObjectId[];

  constructor(userId: ObjectId, orderItemIds: ObjectId[] = []) {
    this.id = new ObjectId();
    this.userId = userId;
    this.orderItemIds = orderItemIds;
  }

  addItem(orderItemId: ObjectId) {
    this.orderItemIds.push(orderItemId);
  }
}