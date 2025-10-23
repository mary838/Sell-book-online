import { Request, Response } from "express";
import { userModel } from "@/models/userModel";

export const getUserService = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      data: [],
      message: "Error fetching users",
    });
  }
};

//Update user  By Id
export const updateUserService = async (id: string, updateData: any) => {
  try {
    // Pass the update data and { new: true } to return the updated document
    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return {
        success: false,
        data: null,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      data: null,
      message: "Internal server error while updating user",
    };
  }
};

// Delete User By Id
export const deleteUserService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: null, 
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error while deleting user",
    });
  }
};


// Get User By Id
export const getUserByIdService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json(
      { 
        success: false, 
        message: "User not found" 
      });
  }
  return res.status(200).json(
    { 
      success: true,
      data: user }
    );
};


