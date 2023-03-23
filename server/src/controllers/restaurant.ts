import { Request, Response } from "express";
import RestaurantService, { RestaurantResult } from "../services/restaurant";
import { FoodDocument, FoodItem } from "../models/Food";
import { pick, omit } from "lodash";

// Presenter functions to remove unused fields
function presentFoods(foods: FoodDocument[]): FoodItem[] {
  return foods.map((food) =>
    pick(food, ["name", "price", "description", "image_url"])
  );
}

function presentRestaurant(result: RestaurantResult) {
  const mongoFields = ["_id", "created_at", "updated_at", "__v"];
  return {
    restaurant: omit(result.restaurant, mongoFields),
    foods: presentFoods(result.foods),
  };
}

// Controllers
async function findNearbyRestaurants(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const latitude: number = parseFloat(request.query.latitude as string);
    const longitude: number = parseFloat(request.query.longitude as string);
    const meters: number = parseInt(request.query.meters as string);
    const restaurants = await RestaurantService.findNear(
      [longitude, latitude],
      meters
    );

    response.status(200).json({
      count: restaurants.length,
      rows: restaurants.map((restaurant) => presentRestaurant(restaurant)),
    });
  } catch (error) {
    response.status(500).json(error);
  }
}
async function findNearWithinBudget(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const latitude: number = parseFloat(request.query.latitude as string);
    const longitude: number = parseFloat(request.query.longitude as string);
    const search_radius: number = parseInt(request.query.meters as string);
    const budget: number = parseFloat(request.query.budget as string);
    const restaurants = await RestaurantService.findNearWithinBudget(
      [longitude, latitude],
      search_radius,
      budget
    );
    
    response.status(200).json({
      count: restaurants.length,
      rows: restaurants.map((restaurant) => presentRestaurant(restaurant)),
    });
  } catch (error) {
    response.status(500).json(error);
  }
}
export default {
  findNearbyRestaurants,
  findNearWithinBudget,
};
