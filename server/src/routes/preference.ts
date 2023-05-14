import express from "express";
import PreferenceController from "../controllers/preference";

const router = express.Router();

router.post("/create", PreferenceController.create);

export default router;
