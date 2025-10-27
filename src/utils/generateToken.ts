import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (userId: string, email: string, role: string) => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };
  return jwt.sign(
    { id: userId, email, role },
    process.env.JWT_SECRET as string,
    options
  );
};
