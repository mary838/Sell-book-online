import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "@/types/category";

const categorySchema = new Schema<ICategory>(
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
      maxlength: 300,
    },
  },
  {
    timestamps: true, // this automatically adds createdAt & updatedAt
  }
);

const categoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default categoryModel;
