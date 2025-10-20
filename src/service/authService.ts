import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import { generateToken } from "@/utils/generateToken";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerService = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(201).json({ message: "User register successfully" });
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
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

    const token = generateToken(
      newUser.id.toString(),
      newUser.email,
      newUser.role || "user"
    );

    return res.status(201).json({
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
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration Service Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

export const loginService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(
      existingUser._id.toString(),
      existingUser.email,
      existingUser.role
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("Login Service Error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};
