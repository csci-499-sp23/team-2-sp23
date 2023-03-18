import express from "express";
import RestaurantController from "../controllers/restaurant";

const router = express.Router();

router.get("/nearby", RestaurantController.findNearbyRestaurants)

export default router;