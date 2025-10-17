import mongoose, {Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: number;
    role: "user" | "admin";
}

const userSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    role: {type: String, enum: ["user", "admin"], default: "user"},
}, {
    timestamps: true,
})

export const userModel = mongoose.model<IUser>("USer", userSchema)

export default userModel;