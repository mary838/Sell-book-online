import { Request, Response } from "express";
import { getUserService , deleteUserService , updateUserService , createUserService  } from "@/service/userService";

// Get Users Controller
export const getUsersController = async (req: Request, res: Response) => {
    console.log("Inside getUsersController");
    const getUserResult = await getUserService(req, res);
    return getUserResult;
};

// Delete User Controller
export const deleteUserController = async (req: Request, res: Response) => {
  const deleteUserResult = await deleteUserService(req, res);
  return deleteUserResult;
}

// Update User Controller
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await updateUserService(id, updateData);
  return res.status(result.success ? 200 : result.message === "User not found" ? 404 : 500).json(result);
};

// Create User Controller
export const createUserController = async (req: Request, res: Response) => {
  const registerResult = await createUserService(req, res);
  return registerResult;
};