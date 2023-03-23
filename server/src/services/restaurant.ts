import { ObjectId } from "mongoose";
import {
  Coordinates,
  RestaurantAttributes,
  RestaurantDocument,
  RestaurantModel,
} from "../models/Restaurant";
import { MenuModel } from "../models/Menu";
import { FoodDocument } from "../models/Food";
import MenuService from "../services/menu";

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
export type RestaurantResult = {
  restaurant: RestaurantDocument;
  foods: FoodDocument[];
};

// generates an aggregrate pipeline from coordinates and search radius
// to be used in RestaurantModel.aggregate(queryPipeline)
// aggregrate pipeline returns type RestaurantResult
function generateNearbyQuery(
  coordinates: Coordinates,
  searchRadius: Meters
): any[] {
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

  return [
    filterNearbyRestaurants,
    setRestaurantInObject,
    leftJoinMenus,
    unwindMenus,
    leftJoinFoods,
    removeMenuField,
  ];
}

async function findNear(
  coordinates: Coordinates,
  searchRadius: Meters
): Promise<RestaurantResult[]> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  return RestaurantModel.aggregate(nearbyQuery);
}

async function findNearWithinBudget(
  coordinates: Coordinates,
  searchRadius: Meters,
  budget: number
): Promise<RestaurantResult[]> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
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

  const nearbyBudgetQuery: any[] = [
    ...nearbyQuery,
    filterFoodsInBudget,
    addFoodCountField,
    pickRestaurantsInBudget,
  ];

  return RestaurantModel.aggregate(nearbyBudgetQuery);
}

async function findByYelpId(yelpId: string): Promise<{
  restaurant: RestaurantDocument;
  foods: FoodDocument[];
}> {
  const restaurant = await RestaurantModel.findOne({ yelp_id: yelpId });
  const foods: FoodDocument[] = await MenuService.getFoods(
    restaurant!.menu_id!
  );

  return {
    restaurant: restaurant!,
    foods: foods,
  };
}

export default {
  create,
  upsert,
  exists,
  updateMenu,
  findNear,
  findNearWithinBudget,
  findByYelpId,
};
