import { Request, Response } from "express";
import { authorModel } from "@/models/authorModel";
import { handleError } from "@/constant/handleError";


//create author service
export const createAuthorService = async (req: Request, res: Response) => {

try{
    const { name, phone, dob } = req.body;
// for take data from body name phone dob
    const existingAuthor = await authorModel.findOne({ $or: [ { name }, { phone } ] });
// check existing author by name or phone
    if (existingAuthor) {
        return handleError(res, 400, "Author with the same name or phone already exists.");
    }
// have name or phone already exists. return handleError(res, 400, "Author with the same name or phone already exists.");
    const newAuthor = new authorModel({
        name,
        phone,
        dob,
    });
// create new author use authorModel

    const savedAuthor = await newAuthor.save();
// save new author to database

    res.status(201).json({
        message: "Author created successfully",
        data: savedAuthor,
    });
 // return Author create successfully   

}
catch(error){
    console.error(error);
    return handleError(res, 500, "Failed to create Author.");   

};
//take error when database cann't have or res data
    
};


//This code for get author from create Author 
export const getAuthorService = async (req: Request, res: Response) => {
// This fauction for getAuthorService and use async for Request or Response data 
    try {
//use try and catch for working Response from database, catch use for take error when database cann't response data

        const authorData = req.body;
// use for set data from body like name  phone dob
        const author = await authorModel.find({authorData});
// use  await wait find all database from authorData and use AuthorSchma for take Model   
        if (!author) {
            return handleError(res, 404, "Author not found");
        }
// when don't have author have error return handleError(res, 404, "Author not found");
        res.status(200).json({
            message: "Get Author successfully",
            data: author,
        })
// when have return  Get Author successfully 

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to fetch Author.");
    }
}

//update author service
export const updateAuthorService = async (req: Request, res: Response) => {
    try {
        const authorId = req.params.id;
        const updateData = req.body;
// id for param and update date in body
        const updatedAuthor = await authorModel.findByIdAndUpdate(
            authorId,
            updateData,
            { new: true }
        );
// findByIdAndUpdate for update author by id
        if (!updatedAuthor) {
            return handleError(res, 404, "Author not found");
        }
//  don't have author have error return handleError(res, 404, "Author not found");
        res.status(200).json({
            message: "Author updated successfully",
            data: updatedAuthor,
        });
// have return Author updated successfully
    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to update Author.");
    }
};

//delete author service
export const deleteAuthorService = async (req: Request, res: Response) => {
    try {
        const authorId = req.params.id;
// take id from param
        const deletedAuthor = await authorModel.findByIdAndDelete(authorId);
// findByIdAndDelete for delete author by id
        if (!deletedAuthor) {
            return handleError(res, 404, "Author not found");
        }
//  don't have author have error return handleError(res, 404, "Author not found");
        res.status(200).json({
            message: "Author deleted successfully",
        });
// have return Author deleted successfully
     
    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to delete Author.");
    }
};

//get all authors service
export const getAllAuthorsService = async (req: Request, res: Response) => {
    try {
        const authors = await authorModel.find();
// find for get all authors from database
        res.status(200).json({
            message: "Authors fetched successfully",
            data: authors,
        });
// return Authors fetched successfully
    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to fetch Authors.");
    }
};