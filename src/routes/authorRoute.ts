
import { Router } from "express";
import { createAuthorController , updateAuthorController , getAuthorController , deleteAuthorController  , getAllAuthorsController } from "../controller/authorController";

const AuthorRouter = Router();

// POST /api/author
AuthorRouter.post("/create-author", createAuthorController);
// PUT /api/author/:id
AuthorRouter.put("/updated-author/:id", updateAuthorController);
// GET /api/author/:id
AuthorRouter.get("/authors/:id", getAuthorController);
// DELETE /api/author/:id
AuthorRouter.delete("/deleted-author/:id", deleteAuthorController);
// GET /api/authors
AuthorRouter.get("/authors", getAllAuthorsController);

export default AuthorRouter;
