import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Author Interface
 * Represents the Author document in MongoDB
 */
export interface Author extends Document {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  dob: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Author Schema
 */
const authorSchema = new Schema<Author>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false, // optional: hides __v field
  }
);

/**
 * Author Model
 */
export const authorModel = mongoose.model<Author>("Author", authorSchema);
