import CategoryModel from "@/models/category";
import { CategoryResult, CreateCategoryInput } from "@/types/category";

// ✅ Create category
export const createCategoryService = async (
  categoryData: CreateCategoryInput
): Promise<CategoryResult> => {
  try {
    const newCategory = new CategoryModel(categoryData);
    const saved = await newCategory.save();
    return {
      success: true,
      data: saved,
      message: "Category created successfully",
    };
  } catch (error) {
    return { success: false, message: "Failed to create category", data: null };
  }
};

// ✅ Get all categories
export const getCategoriesService = async (): Promise<CategoryResult> => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return { success: true, data: categories };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch categories",
      data: null,
    };
  }
};

// ✅ Get single category by ID
export const getCategoryByIdService = async (
  id: string
): Promise<CategoryResult> => {
  try {
    const category = await CategoryModel.findById(id);
    if (!category)
      return { success: false, message: "Category not found", data: null };
    return { success: true, data: category };
  } catch (error) {
    return { success: false, message: "Failed to get category", data: null };
  }
};

// ✅ Update category
export const updateCategoryService = async (
  id: string,
  data: CreateCategoryInput
): Promise<CategoryResult> => {
  try {
    const updated = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated)
      return { success: false, message: "Category not found", data: null };
    return {
      success: true,
      data: updated,
      message: "Category updated successfully",
    };
  } catch (error) {
    return { success: false, message: "Failed to update category", data: null };
  }
};

// ✅ Delete category
export const deleteCategoryService = async (
  id: string
): Promise<CategoryResult> => {
  try {
    const deleted = await CategoryModel.findByIdAndDelete(id);
    if (!deleted)
      return { success: false, message: "Category not found", data: null };
    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    return { success: false, message: "Failed to delete category", data: null };
  }
};
