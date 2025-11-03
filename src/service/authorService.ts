import { authorModel } from "@/models/authorModel";
import { AuthorInput } from "@/types/author-type";

export const createAuthorService = async (data: AuthorInput) => {
  const { email } = data;

  const existingAuthor = await authorModel.findOne({ email });
  if (existingAuthor) {
    const err: any = new Error("Author with this email already exists.");
    err.code = 11000;
    throw err;
  }

  const newAuthor = new authorModel(data);
  const savedAuthor = await newAuthor.save();

  return savedAuthor;
};
