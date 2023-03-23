import express from "express";
import RestaurantController from "../controllers/restaurant";

const router = express.Router();

router.get("/nearby", RestaurantController.findNearbyRestaurants)
router.get("/nearby-in-budget", RestaurantController.findNearWithinBudget)
export default router;