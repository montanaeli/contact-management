import express from "express";
import { getContactsController, createContactController, getContactByIdController, updateContactController } from "../controllers/contactsController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/", verifyToken, getContactsController);
router.post("/", verifyToken, createContactController);
router.get("/:id", verifyToken, getContactByIdController);
router.put("/:id", verifyToken, updateContactController);

export { router as contactsRoutes };
