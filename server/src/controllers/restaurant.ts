import { Request, Response } from "express";
import RestaurantService, { RestaurantResult } from "../services/restaurant";
import { FoodDocument, FoodItem } from "../models/Food";
import { pick, omit } from "lodash";
import { RESTAURANT_LIMIT } from "../constants/restaurants";

// Presenter functions to remove unused fields
function presentFoods(foods: FoodDocument[]): FoodItem[] {
  return foods.map((food) =>
    pick(food, ["name", "price", "description", "image_url"])
  );
}

function presentRestaurant(result: RestaurantResult) {
  const mongoFields = ["_id", "__v"];
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
    const page: number = parseFloat(request.query.page as string);
    const skip = (!isNaN(page) ? page : 0) * RESTAURANT_LIMIT;

    const foundRestaurants = await RestaurantService.findNear(
      [longitude, latitude],
      meters,
      skip,
      RESTAURANT_LIMIT
    );

    response.status(200).json({
      count: foundRestaurants.count,
      rows: foundRestaurants.restaurants.map((restaurant) =>
        presentRestaurant(restaurant)
      ),
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
    const page: number = parseFloat(request.query.page as string);
    const skip = (!isNaN(page) ? page : 0) * RESTAURANT_LIMIT;

    const foundRestaurants = await RestaurantService.findNearWithinBudget(
      [longitude, latitude],
      search_radius,
      budget,
      skip,
      RESTAURANT_LIMIT
    );

    response.status(200).json({
      count: foundRestaurants.count,
      rows: foundRestaurants.restaurants.map((restaurant) =>
        presentRestaurant(restaurant)
      ),
    });
  } catch (error) {
    response.status(500).json(error);
  }
}

async function findByYelpId(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const yelpId: string = request.query.yelp_id as string;
    const restaurant = await RestaurantService.findByYelpId(yelpId);
    response.status(200).json(restaurant);
  } catch (error) {
    response.status(500).json(error);
  }
}

async function findFoodCategories(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const foodCategories: string[] = await RestaurantService.findFoodCategories();
    response.status(200).json(foodCategories);
  } catch (error) {
    response.status(500).json(error);
  }
}

export default {
  findNearbyRestaurants,
  findNearWithinBudget,
  findByYelpId,
  findFoodCategories,
};
