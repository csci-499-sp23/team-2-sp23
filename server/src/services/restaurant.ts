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
import {
  SortKey,
  SortDirection,
  SORT_KEY,
  SORT_DIRECTION_MAPPING,
} from "../constants/sortables";

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
        count: [{ $count: "count" }],
      },
    },
    {
      $project: {
        restaurants: true,
        count: {
          $ifNull: [{ $first: "$count.count" }, 0],
        },
      },
    },
  ];

  return limitQuery;
}

const MATCH_ANYTHING = { $match: {} };

// Generates query to match restaurants by price category
// Example: ['$','$$'] retrieves restaurants with price category '$' OR '$$'
function priceFilterQuery(prices?: PriceCategory[]): any {
  if (!prices?.length) return MATCH_ANYTHING;
  return {
    $match: { price_category: { $in: prices } },
  };
}

// Generates query to match restaurants by transactions
// Matches all restaurants with transactions containing at least one element in the array
function transactionFilterQuery(transactions?: TransactionCategory[]): any {
  if (!transactions?.length) return MATCH_ANYTHING;
  return {
    $match: { transactions: { $in: transactions } },
  };
}

// Generates query to match restaurants by food categories
// Matches all restaurants which food categories containing at least one element in the array
function foodCategoryFilterQuery(foodCategories?: FoodCategory[]): any {
  if (!foodCategories?.length) return MATCH_ANYTHING;
  return {
    $match: { food_categories: { $in: foodCategories } },
  };
}

function restaurantFilterQuery(filter?: RestaurantFilter): any {
  const priceFilter = priceFilterQuery(filter?.price_categories);
  const transactionFilter = transactionFilterQuery(filter?.transactions);
  const foodCategoryFilter = foodCategoryFilterQuery(filter?.food_categories);

  return [priceFilter, transactionFilter, foodCategoryFilter];
}

function generateSortQuery(
  sortBy?: SortKey,
  sortDirection?: SortDirection
): any[] {
  const NO_SORT: any[] = [];
  if (!sortBy || !sortDirection) return NO_SORT;
  if (!SORT_DIRECTION_MAPPING[sortDirection]) return NO_SORT;

  const sortDirectionValue = SORT_DIRECTION_MAPPING[sortDirection];

  // Sort by food count
  if (sortBy === SORT_KEY.FOODS) {
    const addFoodCountField = {
      $addFields: {
        food_count: { $size: "$foods" },
      },
    };
    const sortByFoodCount = {
      $sort: { food_count: sortDirectionValue },
    };

    return [addFoodCountField, sortByFoodCount];
  }

  return NO_SORT;
}

async function findNear(
  coordinates: Coordinates,
  searchRadius: Meters,
  skip: number,
  limit: number,
  filter?: RestaurantFilter,
  sortBy?: SortKey,
  sortDirection?: SortDirection
): Promise<NearbyRestaurantsResult> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  const populateFoodsQuery = generatePopulateFoodsQuery();
  const restaurantFilters = restaurantFilterQuery(filter);
  const sortQuery = generateSortQuery(sortBy, sortDirection);

  const limitRestaurants = generateRestaurantLimitQuery(skip, limit);

  const [foundRestaurants] = await RestaurantModel.aggregate([
    nearbyQuery,
    ...restaurantFilters,
    ...populateFoodsQuery,
    ...sortQuery,
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
  filter?: RestaurantFilter,
  sortBy?: SortKey,
  sortDirection?: SortDirection
): Promise<NearbyRestaurantsResult> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  const restaurantFilters = restaurantFilterQuery(filter);
  const populateFoodsQuery = generatePopulateFoodsQuery();
  const sortQuery = generateSortQuery(sortBy, sortDirection);

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
    ...restaurantFilters,
    ...populateFoodsQuery,
    filterFoodsInBudget,
    addFoodCountField,
    pickRestaurantsInBudget,
    ...sortQuery,
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
