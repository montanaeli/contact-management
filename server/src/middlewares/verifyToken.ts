import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
const secretKey = process.env.SECRET_KEY

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authToken.toString().replace("Bearer ", "");

  if (!secretKey) {
    return res.status(500).json({ message: "Secret key not defined" });
  }  
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.currentUser = decoded.userId;
    next();
  });
};

export default verifyToken;
