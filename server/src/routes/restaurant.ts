import express from "express";
import RestaurantController from "../controllers/restaurant";

const router = express.Router();

router.get("/nearby", RestaurantController.findNearbyRestaurants);
router.get("/nearby-in-budget", RestaurantController.findNearWithinBudget);
router.get("/find-yelp-id", RestaurantController.findByYelpId);
router.get("/find-food-categories", RestaurantController.findFoodCategories);
router.get(
  "/find-nearby-food-categories",
  RestaurantController.findNearbyCategoriesInBudget
);
router.get(
  "/nearby-in-budget-recommended",
  RestaurantController.findNearInBudgetRecommended
);

export default router;
