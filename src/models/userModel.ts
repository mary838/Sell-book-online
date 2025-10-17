import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: number;
  role: "user" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true},
    phone: { type: Number },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user", 
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IUser>("User", userSchema);

export default userSchema;