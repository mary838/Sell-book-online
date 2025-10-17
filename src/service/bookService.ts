import { bookModel } from "@/models/bookModel";
import { BookResult, CreateBookInput, IBook } from "@/types/bookType";

export const getBookService = async (): Promise<BookResult[]> => {
    try {
        const books = await bookModel.find();

        return books.map((book) => ({
            success: true,
            data: book,
            message: "Get Book Successfully.",
        }));
    } catch (error) {
        console.error("Error fetching books:", error);
        return [
            {
                success: false,
                data: null,
                message: "Failed to fetch books.",
            },
        ];
    }
};

export const getBookByIdService = async (id: string):Promise<BookResult> => {
    try {
        const book = await bookModel.findById(id);
        if(!book) {
            return {
                success: false,
                data: null,
                message: "Book not found.",
            }
        }

        return {
            success: true,
            data: book,
            message: "Book fetched successfully.",
        }

        
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return {
            success: false,
            data: null,
            message: "Failed to fetch book.",
        }
    }
}

export const createBookService = async (
    bookData: CreateBookInput
): Promise<BookResult> => {
    try {
        const newBook = new bookModel(bookData);
        const savedBook = await newBook.save();
        return {
            success: true,
            data: savedBook,
            message: "Book created successfully.",
        };
    } catch (error) {
        console.error("Error creating book:", error);
        return {
            success: false,
            data: null as any,
            message: "Failed to create book.",
        };
    }
};

export const updateBookService = async (id: string, updateData: IBook): Promise<BookResult> => {

    try {
        const updatedBook = await bookModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if(!updatedBook) {
            return {
                success: false,
                data: null,
                message: "Book not found.",
            }
        }

        return {
            success: true,
            data: updatedBook,
            message: "Book updated successfully.",
        }


    } catch (error) {
        console.error("update Book Data", error);
        return {
            success: false,
            data: null,
            message: "Failed to update book.",
        }
    }

}

export const deleteBookService = async (id: string): Promise<BookResult> => {
    try {
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if(!deletedBook) {
            return {
                success: false,
                data: deletedBook,
                message: "Book not found.",
            }
        }

        return {
            success: true,
            data: deletedBook,
            message: "Book deleted successfully.",
        }
    } catch (error) {
        console.error("delete Book Data", error);
        return {
            success: false,
            data: null,
            message: "Failed to delete book.",
        }
    }
}