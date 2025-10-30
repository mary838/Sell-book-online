import mongoose, { Types, Schema, Document } from "mongoose";

export interface Author extends Document {
    _id: Types.ObjectId;
    name : string;
    phone : string;
    dob: string;
   
}

const authorSchema = new Schema<Author>(
    {
        name: { type: String, required: true , unique: true },
        phone: { type: String, required: true, unique: true },
        dob : { type: String, required: true},
      
    },
    { timestamps: true },
);

export const AuthorSchema = mongoose.model<Author>("Author", authorSchema);

