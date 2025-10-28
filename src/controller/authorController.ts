//author
import { Request, Response } from "express";
//import Request and Response from express
//have create author service and update and delete 
import { createAuthorService , updateAuthorService , getAuthorService , deleteAuthorService , getAllAuthorsService} from "@/service/authorService";


//create author controller
export const createAuthorController = async (req: Request, res: Response) => {
    return await createAuthorService(req, res);
//call create author service with req and res
};

//delete author controller
export const deleteAuthorController = async (req: Request, res: Response) => {
//faction async with res and req
    return await deleteAuthorService(req, res);
//call delete author service with req and res
};

//update author controller
export const updateAuthorController = async (req: Request, res: Response) => {
// use export const updateAuthorController for update author controller with async for req and res
    return await updateAuthorService(req, res);
//call update author service with req and res
};

//get author controller
export const getAuthorController = async (req: Request, res: Response) => {
//faction async with res and req
    return await getAuthorService(req, res);
//call get author service with req and res
};

//get all authors controller
export const getAllAuthorsController = async (req: Request, res: Response) => {
    return await getAllAuthorsService(req, res);
};

