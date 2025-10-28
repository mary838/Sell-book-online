import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "@/service/categoryService";
import { CreateCategoryInput } from "@/types/category";
// create category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: CreateCategoryInput = req.body;
    const result = await createCategoryService(categoryData);
    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// get all categories
export const getCategories = async (_req: Request, res: Response) => {
  const getAllCategory = await getAllCategoriesService();
  res.status(getAllCategory.success ? 200 : 400).json(getAllCategory);
};
// get category by id
export const getCategoryById = async (req: Request, res: Response) => {
  const getCategoryBYId = await getCategoryByIdService(req.params.id);
  res.status(getCategoryBYId.success ? 200 : 404).json(getCategoryBYId);
};
// update category
export const updateCategory = async (req: Request, res: Response) => {
  const updateCategory = await updateCategoryService(req.params.id, req.body);
  res.status(updateCategory.success ? 200 : 404).json(updateCategory);
};
// delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const deleteCategory = await deleteCategoryService(req.params.id);
  res.status(deleteCategory.success ? 200 : 404).json(deleteCategory);
};
