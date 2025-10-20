import express from "express";
import { getUsersController  , deleteUserController , updateUserController , getUserByIdController  } from "@/controller/userController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = express.Router();

// GET /api/v1/users
router.get("/users" , getUsersController);
// DELETE /api/v1/users/:id
router.delete("/delete-user/:id", authMiddleware , deleteUserController);
// Update User By Id
router.put("/update-user/:id" , authMiddleware ,  updateUserController);
// Get User By Id
router.get("/get-user/:id" , authMiddleware , getUserByIdController);




export default router;
