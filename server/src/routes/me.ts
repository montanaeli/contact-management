import express from "express";
import { getUserData } from "../controllers/meController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/", verifyToken, getUserData);

export { router as meRoutes };
