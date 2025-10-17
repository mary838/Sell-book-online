import express from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import { createBookController, getBookController, updatedBookController, deleteBookController, getBookByIdController } from "@/controller/bookController";

const bookRouter = express.Router();

bookRouter.delete("/delete-book/:id", deleteBookController, authMiddleware);
bookRouter.put("/updated-Book/:id", updatedBookController, authMiddleware)
bookRouter.post("/create-book", createBookController);
bookRouter.get("/books/:id", getBookByIdController);
bookRouter.get("/books", getBookController);

export default bookRouter;
