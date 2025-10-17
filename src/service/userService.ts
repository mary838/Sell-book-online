import { Request, Response } from "express";
import { userModel } from "@/model/userModel";
import { generateToken } from "@/utils/generateToken";
import bcrypt from "bcrypt";



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
//Create user service
export const createUserService = async ( req: Request, res: Response ) => {
    const {name, email, password, phone, role} = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
     res.status(201).json({message: "User register successfully"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "user",
    });
    await newUser.save();


    const token = generateToken(newUser.id.toString(), newUser.email, newUser.role || "user");

    return {
      success: true,
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role || "user",
        },
        token,
      },
    };
  } catch (error) {
    console.error("Create User  Service Error:", error);
    return {
      success: false,
      message: " failed to Create User",
    };
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

