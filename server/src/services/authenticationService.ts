import { users, User } from "../data/database";
import jwt from "jsonwebtoken";

const secretKey = "confidential_key";

export const authenticateUser = (username: string, password: string): string | null => {
  const user: User | undefined = users.find((u) => u.username === username && u.password === password);
  if (user) {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: "3h" });
  }
  return null;
};
