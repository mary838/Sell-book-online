import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import { generateTokens } from "@/utils/jwt";
import { Request, Response } from "express";
import { handleError } from "@/constant/handleError";
import jwt from "jsonwebtoken";

export const registerService = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check exist User
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return handleError(res, 401, "User already exists");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      role: role || "user",
    });

    await newUser.save();

    const token = generateTokens(
      newUser.id.toString(),
      newUser.email,
      newUser.role || "user"
    );

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          id: newUser.id,
          name: newUser.user_name,
          email: newUser.email,
          role: newUser.role || "user",
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "An error occurred during registration");
  }
};

export const loginService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return handleError(res, 400, "Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return handleError(res, 400, "Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(
      existingUser._id.toString(),
      existingUser.email,
      existingUser.role
    );

    // Save refresh token in DB
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    // Send refresh token as HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successful",
      accessToken,
      data: {
        user: {
          id: existingUser._id,
          full_name: existingUser.full_name,
          email: existingUser.email,
          role: existingUser.role,
        },
      },
    });
  } catch (error) {
    console.error("Login Service Error:", error);
    return handleError(res, 500, "Login failed. Please try again later.");
  }
};

export const logoutService = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const findUser = await userModel.findOne({ refreshToken });
      if (findUser) {
        (findUser.refreshToken = ""), await findUser.save();
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return handleError(res, 500, "False to logout");
  }
};

export const refreshTokenService = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return handleError(res, 401, "No refresh token provided.");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: string };

    const user = await userModel.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return handleError(res, 403, "Invalid refresh token.");
    }

    // Generate new token
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id.toString(),
      user.email,
      user.role
    );

    // Update refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // Update cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send access token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 403, "Token expired or invalid");
  }
};
