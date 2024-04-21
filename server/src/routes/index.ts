import express from "express";
import { loginRoutes } from "./login";
import { meRoutes } from "./me";
import { contactsRoutes } from "./contacts";

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/me", meRoutes);
router.use("/contacts", contactsRoutes);

export { router as routes };
