import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

router.get("/:id", UserController.findUser);

export default router;
