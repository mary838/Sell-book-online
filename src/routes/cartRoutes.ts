import express from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import {
  addItemToCartController,
  getCartController,
} from "@/controller/cartController";

const cartRoutes = express.Router();

cartRoutes.post("/add-item", authMiddleware, addItemToCartController);
cartRoutes.get("/", authMiddleware, getCartController);

export default cartRoutes;
