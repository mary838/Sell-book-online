import {categoryModel} from "../models/categoryModel";
import { CategoryResult, CreateCategoryInput } from "@/types/category-type";

export const createCategoryService = async (
  categoryData: CreateCategoryInput
): Promise<CategoryResult> => {
  try {
    // Check exising category
    const existingCategory = await categoryModel.findOne({ name: categoryData.name });
    if (existingCategory) {
      return {
        success: false,
        data: null,
        message: "Category already exists",
      };
    }
    const category = new categoryModel(categoryData);
    const saved = await category.save();
    return {
      success: true,
      data: saved,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, data: null, message: "Failed to create category" };
  }
};

export const getAllCategoriesService = async (): Promise<CategoryResult> => {
  try {
    const categories = await categoryModel.find().populate(
      "createdBy",
      "username email"
    );
    return { success: true, data: categories };
  } catch (error) {
    return { success: false, data: null, message: "Failed to get categories" };
  }
};

export const getCategoryByIdService = async (
  id: string
): Promise<CategoryResult> => {
  try {
    const category = await categoryModel.findById(id).populate(
      "createdBy",
      "username email"
    );
    if (!category)
      return { success: false, data: null, message: "Category not found" };
    return { success: true, data: category };
  } catch (error) {
    return { success: false, data: null, message: "Error fetching category" };
  }
};

export const updateCategoryService = async (
  id: string,
  updates: Partial<CreateCategoryInput>
): Promise<CategoryResult> => {
  try {
    const updated = await categoryModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updated)
      return { success: false, data: null, message: "Category not found" };
    return {
      success: true,
      data: updated,
      message: "Category updated successfully",
    };
  } catch (error) {
    return { success: false, data: null, message: "Error updating category" };
  }
};

export const deleteCategoryService = async (
  id: string
): Promise<CategoryResult> => {
  try {
    const deleted = await categoryModel.findByIdAndDelete(id);
    if (!deleted)
      return { success: false, data: null, message: "Category not found" };
    return {
      success: true,
      data: deleted,
      message: "Category deleted successfully",
    };
  } catch (error) {
    return { success: false, data: null, message: "Error deleting category" };
  }
};
