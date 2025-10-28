import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "@/types/auth-type";
import { handleError } from "@/constant/handleError";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return handleError(res, 401, "Unauthorized");
    }

    const token = authHeader?.split(" ")[1];
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
      return handleError(res, 401, "Unauthorized");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & AuthUser;

<<<<<<< HEAD
    if (!decoded?.id || !decoded?.email || !decoded.role) {
      return handleError(res, 400, "Invalid token");
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
=======
        if (!decoded?._id || !decoded?.email || !decoded.role) {
            return handleError(res, 400, "Invalid token");
        }

        req.user = {
            _id: decoded._id,
            email: decoded.email,
            role: decoded.role,
        }

    next();
    
>>>>>>> 0baf21ac58c21d5b57ede4603d9790403df2f232
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return handleError(
        res,
        401,
        "Access token expired. Please refresh your token."
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return handleError(res, 401, "Invalid or malformed token.");
    }

    console.error("Unexpected error:", error);
    return handleError(res, 500, "Unexpected server error.");
  }
};

export const checkRoleMiddleware = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return handleError(res, 401, "Unauthorized.");
      }

      // Check if role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return handleError(res, 403, "Access forbidden.");
      }

      if (!req.user) {
        return handleError(res, 401, "Unauthorized.");
      }

      // Check if role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return handleError(res, 403, "Access forbidden.");
      }

<<<<<<< HEAD
      next();
    } catch (error) {
      console.error(`[Role Middleware Error]`, error);
      return handleError(res, 500, "Unexpected error occurred");
      // Just kidding remove this when lunch production
      // return handleError(res, 500, "I don't know. What's wrong?");
    }
  };
=======
            
            next();

        } catch (error) {
            console.error(error);
            return handleError(res, 500, "Unexpected error occurred");
        }
    };
>>>>>>> 0baf21ac58c21d5b57ede4603d9790403df2f232
};
