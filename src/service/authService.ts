import bcrypt from "bcrypt";
import { userModel } from "@/model/userModel";
import { generateToken } from "@/utils/generateToken";
import { Request, Response } from "express";

export const registerService = async ( req: Request, res: Response ) => {
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
    console.error("Registration Service Error:", error);
    return {
      success: false,
      message: "Registration failed",
    };
  }
};
