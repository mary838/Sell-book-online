import express from "express";
import { getUsersController  , deleteUserController , updateUserController} from "@/controller/userController";
// import { authMiddleware } from "@/middleware/authMiddleware";

const router = express.Router();

// GET /api/v1/users
router.get("/", getUsersController);

// DELETE /api/v1/users/:id
// (You should later create a deleteUserController for this)
router.delete("/:id", deleteUserController);
// Update User By Id
router.put("/update-user/:id" ,  updateUserController);


export default router;
