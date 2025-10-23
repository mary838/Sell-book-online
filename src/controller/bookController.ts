import {
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
  getBookByIdService,
} from "@/service/bookService";
import { CreateBookInput } from "@/types/bookType";
import { Request, Response } from "express";

// Get ALl book
export const getBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all books from MongoDB
    const books = await getBookService();

    res.status(200).json({
      success: true,
      data: books,
      message: "Fetched book data successfully from MongoDB.",
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      data: [],
      message: "Failed to fetch book data.",
    });
  }
};

//Get Book by ID
export const getBookByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const bookById = await getBookByIdService(id);

    if (!bookById.success) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Book not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: bookById,
      message: "Book fetched successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: "Failed to fetch book.",
    });
  }
};

// Create Book
export const createBookController = async (req: Request, res: Response) => {
  try {
    const bookData: CreateBookInput = req.body;
    const result = await createBookService(bookData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create book.",
    });
  }
};

// Update Book
export const updatedBookController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBookResult = await updateBookService(id, updatedData);

    if (!updatedBookResult.success) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Book not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedBookResult,
      message: "Successfully updated book.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: "Failed to update book.",
    });
  }
};

// Delete Book
export const deleteBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBookResult = await deleteBookService(id);

    if (!deletedBookResult.success) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Book not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted book.",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      data: null,
      message: "Failed to delete book.",
    });
  }
};
