import { Request, Response } from "express";
import { getBookService, getBookByIdService, createBookService, updateBookService, deleteBookService } from "@/service/bookService";

// Get All Books
export const getBookController = async (req: Request, res: Response) => {
    return await getBookService(req, res);
};

// Get Book by ID
export const getBookByIdController = async (req: Request, res: Response) => {
    return await getBookByIdService(req, res);
};

// Create Book
export const createBookController = async (req: Request, res: Response) => {
    return await createBookService(req, res);
};

// Update Book
export const updatedBookController = async (req: Request, res: Response) => {
    return await updateBookService(req, res);
};

// Delete Book
export const deleteBookController = async (req: Request, res: Response) => {
    return await deleteBookService(req, res);
};
