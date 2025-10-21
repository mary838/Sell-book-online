import { Response } from "express";

export const handleAuthError =(
    res: Response,
    status: number,
    message: string,
): Response => {
    return res.status(status).json({
        success: false,
        message,
    });
};