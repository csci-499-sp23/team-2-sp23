import { RestaurantAttributes } from "../models/Restaurant";
import { sleep, randomNumberBetween } from "./yelp-utils";
import { fetchRestaurants } from "./api";
import { retrieveFoodsFromYelp } from "./yelp-scraper";
import RestaurantService from "../services/restaurant";
import MenuService from "../services/menu";
import FoodService from "../services/food";
import { ObjectId } from "mongoose";

type PopulateResult = {
  restaurant: number;
  menu: number;
  foods: number;
};

async function taskGenerator(restaurant: RestaurantAttributes) {
  async function populateTask(): Promise<PopulateResult> {
    const restaurantExists = await RestaurantService.exists({
      yelp_id: restaurant.yelp_id,
    });

    const upsertedRestaurant = restaurantExists
      ? await RestaurantService.upsert(
          { yelp_id: restaurant.yelp_id },
          { ...restaurant }
        )
      : await RestaurantService.create(restaurant);

    const createdMenu = await MenuService.create({
      foods: [],
      deprecated: false,
      restaurant_id: upsertedRestaurant._id,
    });

    RestaurantService.updateMenu(upsertedRestaurant._id, createdMenu._id);

    const scrapedFoods = await retrieveFoodsFromYelp(restaurant.yelp_id);
    const foodsWithForeignKeys = scrapedFoods.map((food) => ({
      ...food,
      restaurant_id: upsertedRestaurant._id,
      menu_id: createdMenu._id,
    }));

    const createdFoods = await FoodService.createMany(foodsWithForeignKeys);
    const foodIds: ObjectId[] = createdFoods.map((food) => food._id);

    await MenuService.setFoods(createdMenu._id, foodIds);

    return {
      restaurant: 1,
      menu: 1,
      foods: createdFoods.length,
    };
  }

  return await populateTask();
}

export async function warCrimes(coordinates: Coordinates) {
  const nearbyRestaurants: RestaurantAttributes[] = await fetchRestaurants(
    coordinates
  );

  let populateResults: PopulateResult = {
    restaurant: 0,
    menu: 0,
    foods: 0,
  };

  for (const restaurant of nearbyRestaurants) {
    const populateTask = taskGenerator(restaurant);
    const taskDelay = randomNumberBetween(3, 8) * 1000;
    await sleep(taskDelay);
    await populateTask.then((result: PopulateResult) => {
      populateResults.restaurant += result.restaurant;
      populateResults.menu += result.menu;
      populateResults.foods += result.foods;
    });
  }

  return populateResults;
}
