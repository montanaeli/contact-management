import express from "express";
import {
  getContactsController,
  createContactController,
  getContactByIdController,
  updateContactController,
} from "../controllers/contactsController";
import verifyToken from "../middlewares/verifyToken";
import { validateData } from "../middlewares/validateData";
import { create, update } from "../validators/contact";

const router = express.Router();

router.get("/", verifyToken, getContactsController);
router.post("/", verifyToken, validateData(create), createContactController);
router.get("/:id", verifyToken, getContactByIdController);
router.put("/:id", verifyToken, validateData(update), updateContactController);

export { router as contactsRoutes };
