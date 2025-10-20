import { Request, Response } from "express";
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../service/categoryService";

export const createCategory = async (req: Request, res: Response) => {
  const result = await createCategoryService(req.body);
  res.status(result.success ? 201 : 400).json(result);
};

export const getCategories = async (_req: Request, res: Response) => {
  const result = await getCategoriesService();
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
