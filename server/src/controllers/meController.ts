import express from "express";
import { Request, Response } from "express";
import { getUser } from "../services/userService"

const router = express.Router();

export const getUserData = (req: Request, res: Response) => {
  const user = getUser(req.currentUser)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
      res.status(200).json({
        id: user.id,
        name: user.name,
        contacts: user.contacts,
      });
  }
}
