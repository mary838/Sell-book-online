import { Request, Response } from "express";
import { createAuthorService, getAllAuthorsService } from "@/service/authorService";
import { handleError, handleSuccess } from "@/utils/response-util";
import { AppError } from "@/utils/app-error";

export const createAuthorController = async (req: Request, res: Response) => {
  try {
    const author = await createAuthorService(req.body);
    return handleSuccess(res, 201, "Author created successfully.", author);
  } catch (error: unknown) {
    console.error("[CREATE_AUTHOR_CONTROLLER_ERROR]:", error);

    if (error instanceof Error) {
      const customError = error as { name?: string; code?: number; message: string };

      if (customError.name === "ValidationError") {
        return handleError(res, 400, customError.message);
      }

      if (customError.code === 11000) {
        return handleError(res, 400, "Author with this email already exists.");
      }

      return handleError(res, 500, customError.message || "Failed to create author.");
    }

    return handleError(res, 500, "An unexpected error occurred.");
  }
};

export const getAllAuthorsController = async (req: Request, res: Response) => {
  try {
    const authors = await getAllAuthorsService();
    return handleSuccess(res, 200, "Authors retrived successfully.", authors);
  } catch (error) {
    // console.error(error)
    if (error instanceof AppError) {
      return handleError(res, error.statusCode, error.message || "Failed to fetch authors.");
    }
    
    return handleError(res, 500, "An unexpected error occurred.");
  }
};
