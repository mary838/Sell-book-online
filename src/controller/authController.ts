import { Request, Response } from "express";
import { registerService } from "@/service/authService";

export const registerController = async (req: Request, res: Response):Promise<void> => {
    const { name, email, password, phone, role } = req.body;

    try {
        const result = await registerService(name, email, password, phone, role);

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