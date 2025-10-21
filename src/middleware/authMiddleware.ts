import { Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "@/types/authType";
import { handleAuthError } from "@/constant/handleAuthError";


declare global {
    namespace Express {
       interface Request {
           user?: AuthUser
       }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void | Response => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return handleAuthError(res, 401, "Unauthorized");
        }

        const token = authHeader?.split(" ")[1]
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return handleAuthError(res, 401, "Unauthorized");
        }

        const decoded = jwt.verify(token, secret) as JwtPayload & AuthUser;

        if (!decoded?.id || !decoded?.email || !decoded.role) {
            return handleAuthError(res, 400, "Invalid token");
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        }

        next();

    } catch (error) {
        if (error instanceof Error) {

            if (error.name === "Token Expired.") {
                return handleAuthError(res, 401, "Token expired. Please login again.");
            }

            if (error.name === "Token Error") {
                return handleAuthError(res, 402, "Invalid token. Access denied.");
            }

            console.error("Unexpected error:", error.message)
        }

        console.error(error);
        return handleAuthError(res, 500, "Unexpected error occurred.")
    }
};

export const checkRoleMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return handleAuthError(res, 401, "Unauthorized");
        }

        if (!allowedRoles.includes(req.user.role)) {
            return handleAuthError(res, 403, "Permission Forbidden.")
        }
    }
}