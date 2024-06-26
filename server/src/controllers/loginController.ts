import { Request, Response } from "express";
import { authenticateUser } from "../services/authenticationService";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await authenticateUser(username, password);
  if (token) {
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
