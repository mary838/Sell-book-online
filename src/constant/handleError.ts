import { Response } from "express";

export const handleError =(
    res: Response,
    status: number,
    message: string,
): Response => {
    return res.status(status).json({
        success: false,
        message,
    });
};