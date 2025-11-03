import { Request, Response } from "express";
import { createAuthorService } from "@/service/authorService";
import { handleError, handleSuccess } from "@/utils/response-util";

export const createAuthorController = async (req: Request, res: Response): Promise<Response> => {
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
