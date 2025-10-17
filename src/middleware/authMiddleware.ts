import { Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "@/types/authType";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

const handleAuthError = (
    res: Response,
    status: number,
    message: string,
): Response => {
    return res.status(status).json({
        success: false,
        message,
    });
};

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Beare")) {
            return handleAuthError(res, 401, "Unauthorized: Missing token.");
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return handleAuthError(res, 500, "Server Error.");
        }

        const decoded = jwt.verify(token, secret) as JwtPayload & AuthUser;

        if (!decoded?.id || !decoded?.email || !decoded?.role) {
            return handleAuthError(res, 400, "invalid Token.");
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();


    } catch (error) {

        if (error instanceof Error) {

            if (error.name === "Token Expired.") {
                return handleAuthError(res, 401, "Token expired. Plase login again.");
            }

            if (error.name === "Token Error") {
                return handleAuthError(res, 402, "Invalid token. Access denied.");
            }

            console.error("Unexpected error:", error.message)
        };

        console.error(error);
        return handleAuthError(res, 500, "Unexpected error occurred.")
    };

};

export const checkRoleMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void | Response => {
        if (!req.user) {
            return handleAuthError(res, 401, "Unauthorized.");
        }

        if (!allowedRoles.includes(req.user.role)) {
            return handleAuthError(res, 403, "Premissions Forbidden.");
        }

        next();
    };
};