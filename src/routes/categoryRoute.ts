import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController";

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-categories", getCategories);
router.get("/get-category/:id", getCategoryById);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

export default router;
