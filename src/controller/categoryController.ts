import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "@/service/categoryService";
import { CreateCategoryInput } from "@/types/category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: CreateCategoryInput = req.body;
    const result = await createCategoryService(categoryData);
    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  const result = await getAllCategoriesService();
  res.status(result.success ? 200 : 400).json(result);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const result = await getCategoryByIdService(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};

export const updateCategory = async (req: Request, res: Response) => {
  const result = await updateCategoryService(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const result = await deleteCategoryService(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
};
