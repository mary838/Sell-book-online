import { Router } from "express";
import { getUsersController  , deleteUserController , updateUserController , getUserByIdController  } from "@/controller/userController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const UserRouter = Router();
// GET /api/v1/users
UserRouter.get("/users", 
    authMiddleware, 
    checkRoleMiddleware("admin"), 
    getUsersController
);
// DELETE /api/v1/users/:id
UserRouter.delete("/delete-user/:id", 
    authMiddleware, 
    checkRoleMiddleware("admin"),
    deleteUserController
);
// Update User By Id
UserRouter.put("/updated-user/:id",
    authMiddleware, 
    checkRoleMiddleware("admin"),
    updateUserController
);
// Get User By Id
UserRouter.get("/users/:id" ,
    authMiddleware, 
    checkRoleMiddleware("admin"),
    getUserByIdController
);




export default UserRouter;
