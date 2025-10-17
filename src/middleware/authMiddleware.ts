import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            }
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) { 
        return res.status(401).json({message: "Unauthorized"});
    }
    
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
            role: string;
        };

      req.user = decoded,
      next();
     
    } catch(error: unknown) {
        // console.error("Auth Middleware Error:", error);
      return res.status(401).json({
      success: false,
      message:
        (error as Error).name === "TokenExpiredError"
          ? "Token expired, please log in again"
          : "Invalid token",
    });
    }
}