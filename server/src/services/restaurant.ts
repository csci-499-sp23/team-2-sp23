import { ObjectId } from "mongoose";
import {
  Coordinates,
  RestaurantAttributes,
  RestaurantDocument,
  RestaurantModel,
} from "../models/Restaurant";
import { MenuModel } from "../models/Menu";
import { FoodDocument } from "../models/Food";

async function create(
  restaurant: RestaurantAttributes
): Promise<RestaurantDocument> {
  return RestaurantModel.create({
    ...restaurant,
    created_at: new Date(),
  });
}

async function exists(query: any): Promise<boolean> {
  const found = await RestaurantModel.exists(query);
  return !!found;
}

async function upsert(
  query: any,
  restaurant: RestaurantAttributes
): Promise<RestaurantDocument> {
  return RestaurantModel.findOneAndUpdate(
    query,
    { ...restaurant, updated_at: new Date() },
    { new: true, upsert: true }
  );
}

async function updateMenu(
  restaurantId: ObjectId,
  menuId: ObjectId
): Promise<RestaurantDocument | null> {
  const restaurant = await RestaurantModel.findById(restaurantId);
  if (restaurant?.menu_id !== null) {
    await MenuModel.findOneAndUpdate(
      { _id: restaurant?.menu_id },
      { deprecated: true }
    );
  }

  return RestaurantModel.findOneAndUpdate(
    { _id: restaurantId },
    { menu_id: menuId },
    { new: true }
  );
}

type Meters = number;
async function findNear(
  coordinates: Coordinates,
  searchRadius: Meters
): Promise<RestaurantDocument[] | null> {
  return RestaurantModel.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: coordinates },
        distanceField: "distance",
        maxDistance: searchRadius,
        spherical: true,
      },
    },
  ]);
}

export type RestaurantResult = {
  restaurant: RestaurantDocument;
  foods: FoodDocument;
};

async function findNearWithinBudget(
  coordinates: Coordinates,
  searchRadius: Meters,
  budget: number
): Promise<RestaurantResult[]> {
  const filterNearbyRestaurants = {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: coordinates,
      },
      distanceField: "distance",
      maxDistance: searchRadius,
      spherical: true,
    },
  };
  const setRestaurantInObject = {
    $project: {
      _id: false,
      restaurant: "$$ROOT",
    },
  };
  const leftJoinMenus = {
    $lookup: {
      from: "menus",
      localField: "restaurant.menu_id",
      foreignField: "_id",
      as: "menu",
    },
  };
  const unwindMenus = {
    $unwind: "$menu",
  };
  const leftJoinFoods = {
    $lookup: {
      from: "foods",
      localField: "menu.foods",
      foreignField: "_id",
      as: "foods",
    },
  };
  const removeMenuField = {
    $unset: ["menu"],
  };
  const filterFoodsInBudget = {
    $addFields: {
      foods: {
        $filter: {
          input: "$foods",
          cond: { $lte: ["$$food.price", budget] },
          as: "food",
        },
      },
    },
  };
  const addFoodCountField = {
    $addFields: {
      food_count: { $size: "$foods" },
    },
  };
  const pickRestaurantsInBudget = {
    $match: {
      food_count: { $ne: 0 },
    },
  };

  const fatassQuery: any[] = [
    filterNearbyRestaurants,
    setRestaurantInObject,
    leftJoinMenus,
    unwindMenus,
    leftJoinFoods,
    removeMenuField,
    filterFoodsInBudget,
    addFoodCountField,
    pickRestaurantsInBudget,
  ];

  return RestaurantModel.aggregate(fatassQuery);
}

export default {
  create,
  upsert,
  exists,
  updateMenu,
  findNear,
  findNearWithinBudget,
};
