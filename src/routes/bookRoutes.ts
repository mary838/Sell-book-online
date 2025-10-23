import { Router }from "express";
import { 
  authMiddleware, 
  checkRoleMiddleware 
} from "@/middleware/authMiddleware";

import { 
  createBookController, 
  getBookController, 
  updatedBookController, 
  deleteBookController, 
  getBookByIdController 
} from "@/controller/bookController";

const bookRouter = Router();

bookRouter.post(
  "/create-book",
  authMiddleware,
  checkRoleMiddleware("admin"),
  createBookController
);

bookRouter.put(
  "/update-book/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  updatedBookController
);

bookRouter.delete(
  "/delete-book/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  deleteBookController
);

bookRouter.get("/books/:id", authMiddleware, getBookByIdController);
bookRouter.get("/books",authMiddleware, getBookController);

export default bookRouter;
