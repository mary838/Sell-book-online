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
    // const {name, email, password, phone, role} = req.body;

    try {
        const result = await createUserService(req , res);

        if(!result.success) {
            res.status(400).json({
                success: false,
                message: result.message || "Registration failed",
            })
            return;
        }

        res.status(201).json({
            success: true,
            data: result.data,
            message: "User registered successfully",
        })
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({
            success: false,
            message: "Registration failed",
        })
    }
}