import { authorModel } from "@/models/authorModel";
import { AuthorInput } from "@/types/author-type";
import { AppError } from "@/utils/app-error";

export const createAuthorService = async (data: AuthorInput) => {
  const { email } = data;

  const existingAuthor = await authorModel.findOne({ email });
  if (existingAuthor) {
  throw new AppError("Author with this email already exists.", 400, 11000);
  }

  const newAuthor = new authorModel(data);
  const savedAuthor = await newAuthor.save();

  return savedAuthor;
};

// get all authors
export const getAllAuthorsService = async () => {
  try {
      const authors = await authorModel.find();
  
    if (!authors) {
      throw new AppError("No authors found.", 404);
    }
    
    return authors;
  } catch (error) {
    // console.error(error)
    if (error instanceof AppError) {
      throw new AppError("Database error occurred while fetching authors.", 500);
    }
  
    throw new AppError( error instanceof Error ? error.message : "Failed to fetch authors", 500);
  }
};