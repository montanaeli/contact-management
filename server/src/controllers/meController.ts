import express from "express";
import { users } from "../data/database";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  const actualUser = users.find((u) => u.id === req.currentUser);
  if (!actualUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    id: actualUser.id,
    name: actualUser.name,
    contacts: actualUser.contacts,
  });
});

export { router as meController };
