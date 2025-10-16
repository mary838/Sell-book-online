import express from "express";
import { createBook } from "../controller/bookController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = express.Router();

router.post("/create-book", createBook, authMiddleware);

export default router;
