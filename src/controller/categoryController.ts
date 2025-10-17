import { Request, Response } from "express";
import { createCategoryService } from "../service/categoryService";
import { CreateCategoryInput } from "@/types/category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: CreateCategoryInput = req.body;
    const result = await createCategoryService(categoryData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create category.",
    });
  }
};
