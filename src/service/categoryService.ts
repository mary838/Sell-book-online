import categoryModel from "@/models/category";
import { CategoryResult, CreateCategoryInput } from "@/types/category";

export const createCategoryService = async (
  categoryData: CreateCategoryInput
): Promise<CategoryResult> => {
  try {
    const newCategory = new categoryModel(categoryData);
    const savedCategory = await newCategory.save();

    return {
      success: true,
      data: savedCategory,
      message: "Category created successfully.",
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      data: null,
      message: "Failed to create category.",
    };
  }
};
