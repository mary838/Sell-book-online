
import { Router } from "express";
import { createAuthorController , updateAuthorController , getAuthorController , deleteAuthorController  , getAllAuthorsController } from "../controller/authorController";

const AuthorRouter = Router();

// POST /api/author
AuthorRouter.post("/author", createAuthorController);
// PUT /api/author/:id
AuthorRouter.put("/author/:id", updateAuthorController);
// GET /api/author/:id
AuthorRouter.get("/author/:id", getAuthorController);
// DELETE /api/author/:id
AuthorRouter.delete("/author/:id", deleteAuthorController);
// GET /api/authors
AuthorRouter.get("/authors", getAllAuthorsController);

export default AuthorRouter;
