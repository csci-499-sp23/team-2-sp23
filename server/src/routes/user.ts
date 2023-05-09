import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

router.post("/create", UserController.createUser);
router.put("/save-restaurant", UserController.saveRestaurant);
router.get("/:id", UserController.findUser);

export default router;
