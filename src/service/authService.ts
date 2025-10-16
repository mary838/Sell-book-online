import bcrypt from "bcrypt";
import { userModel } from "@/model/userModel";
import { generateToken } from "@/utils/generateToken";

export const registerService = async (name: string, email: string, password: string, phone: number, role?: "user" | "admin") => {
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            // throw new Error("User already exists");
            return {
                // success: false,
                message: "User already exists",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || "user",
        })

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
            // error: error.message,
        };
    }
}


