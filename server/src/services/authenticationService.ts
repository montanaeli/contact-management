import { users, User } from "../data/dataInterfaces";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const authenticateUser = (username: string, password: string): string | null => {
  const user: User | undefined = users.find((u) => u.username === username && u.password === password);
  if (user && secretKey) {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: "3h" });
  }
  return null;
};
