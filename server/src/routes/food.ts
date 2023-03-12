import { Router } from "express";
import { create, createMany, deleteFoodById, findAll, findFoodById } from "../controllers/food";

const router = Router();

// router that handles food requests
router.post("/create", create);
router.post("/create", createMany);
router.post("/delete", deleteFoodById);

// router that finds
router.get("/", findAll);
router.get("/food", findFoodById);

export default router;
