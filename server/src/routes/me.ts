import express from "express";
import { meController } from "../controllers/meController";

const router = express.Router();

router.get("/", meController);

export { router as meRoutes };
