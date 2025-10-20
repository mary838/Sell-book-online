import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "@/types/category";

const categorySchema = new Schema<ICategory & Document>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<ICategory & Document>(
  "Category",
  categorySchema
);

export default CategoryModel;
