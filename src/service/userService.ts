import { Request, Response } from "express";
import { userModel } from "@/models/userModel";
import { handleError } from "@/constant/handleError";

export const getUserService = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const user = await userModel.find({userData});
        if (!user) {
            return handleError(res, 404, "user not found");
        }

        res.status(200).json({
            message: "Get user successfully",
            data: user,
        })

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to fetch user.");
    }
}

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




//Update user  By Id
export const updateUserService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await userModel.findByIdAndUpdate( id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedUser) {
      return handleError(res, 404, "User not found");
    }

    return res.status(200).json({
      message: "Updated user successfully",
      data: updatedUser,
    })

  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Failed to update user");
  }
}

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
      message: "User deleted successfully",
    });
    
  } catch (error) {
    console.error("Error deleting user:", error);
   return handleError(res, 500, "Failed to delete user");
  }
};

// Get me service
export const getMeService = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return handleError(res, 401, "Unauthorized");
    }

    const userProfile = await userModel.findById(req.user._id).select("-password");

    if (!userProfile) {
      return handleError(res, 404, "User profile not found.");
    }

    return res.status(200).json({
      message: "User profile fetched successfully.",
      data: userProfile,
    })

  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Failed to fetch user profile.");
  }
}