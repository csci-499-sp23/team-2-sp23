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

export type NearbyRestaurantsResult = {
  count: number;
  restaurants: RestaurantResult[];
};

// generates an aggregrate pipeline from coordinates and search radius
// to be used in RestaurantModel.aggregate(queryPipeline)
// aggregrate pipeline returns type RestaurantResult
function generateNearbyQuery(
  coordinates: Coordinates,
  searchRadius: Meters
): any {
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

  return filterNearbyRestaurants;
}

function generatePopulateFoodsQuery() {
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
    setRestaurantInObject,
    leftJoinMenus,
    unwindMenus,
    leftJoinFoods,
    removeMenuField,
  ];
}

// Core of pagination
// Returns the total amount of restaurants that match the filter
// Limits the amount of restaurants retrieved
function generateRestaurantLimitQuery(
  skippedDocuments: number,
  documentLimit: number
) {
  const limitQuery = [
    {
      $facet: {
        restaurants: [{ $skip: skippedDocuments }, { $limit: documentLimit }],
        count: [{ $group: { _id: null, count: { $sum: 1 } } }],
      },
    },
    {
      $unwind: "$count",
    },
    {
      $project: {
        restaurants: true,
        count: "$count.count",
      },
    },
  ];

  return limitQuery;
}

const MATCH_ANYTHING = { $match: {} };

// Generates query to match restaurants by price category
// Example: ['$','$$'] retrieves restaurants with '$' OR '$$'
function priceFilterQuery(prices?: PriceCategory[]): any {
  if (!prices?.length) return MATCH_ANYTHING;

  return {
    $match: { price_category: { $in: prices } },
  };
}

// Generates query to match restaurants by transactions
// Example: ['delivery', 'pickup'] matches restaurants with any combination of the transactions
function transactionFilterQuery(transactions?: TransactionCategory[]): any {
  if (!transactions?.length) return MATCH_ANYTHING;
  return {
    $match: { transactions: { $in: transactions } },
  };
}

async function findNear(
  coordinates: Coordinates,
  searchRadius: Meters,
  skip: number,
  limit: number,
  filter?: RestaurantFilter
): Promise<NearbyRestaurantsResult> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  const populateFoodsQuery = generatePopulateFoodsQuery();
  const priceFilter = priceFilterQuery(filter?.price_categories);
  const transactionFilter = transactionFilterQuery(filter?.transactions);
  const limitRestaurants = generateRestaurantLimitQuery(skip, limit);

  const [foundRestaurants] = await RestaurantModel.aggregate([
    nearbyQuery,
    priceFilter,
    transactionFilter,
    ...populateFoodsQuery,
    ...limitRestaurants,
  ]);

  return foundRestaurants;
}

async function findNearWithinBudget(
  coordinates: Coordinates,
  searchRadius: Meters,
  budget: number,
  skip: number,
  limit: number,
  filter?: RestaurantFilter
): Promise<NearbyRestaurantsResult> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  const priceFilter = priceFilterQuery(filter?.price_categories);
  const transactionFilter = transactionFilterQuery(filter?.transactions);
  const populateFoodsQuery = generatePopulateFoodsQuery();

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
  const limitRestaurants = generateRestaurantLimitQuery(skip, limit);

  const nearbyBudgetQuery: any[] = [
    nearbyQuery,
    priceFilter,
    transactionFilter,
    ...populateFoodsQuery,
    filterFoodsInBudget,
    addFoodCountField,
    pickRestaurantsInBudget,
    ...limitRestaurants,
  ];

  const [foundRestaurants]: any = await RestaurantModel.aggregate(
    nearbyBudgetQuery
  );

  return foundRestaurants;
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

async function findFoodCategories(): Promise<string[]> {
  const allFoodCategories: string[][] = await RestaurantModel.find({})
    .select({
      food_categories: 1,
      _id: 0,
    })
    .then((result: any[]) => result.map((row: any) => row.food_categories));

  // Construct set to remove duplicates
  const foodCategories = [...new Set(allFoodCategories.flat())];

  return foodCategories.sort();
}

export default {
  create,
  upsert,
  exists,
  updateMenu,
  findNear,
  findNearWithinBudget,
  findByYelpId,
  findFoodCategories,
};
