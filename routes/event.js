import express from "express";
import { validateEvents } from "../controllers/event.js";
import { validateEvent } from "../middlewares/eventValidation.js";

const router = express.Router();
router.post("/add", validateEvent, validateEvents);
export default router;
