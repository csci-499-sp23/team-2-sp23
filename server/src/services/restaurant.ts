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
  food_categories: any[];
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

function generatePopulateFoodsQuery(): any[] {
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
): any[] {
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
  // Sort by review count
  if (sortBy === SORT_KEY.REVIEWS) {
    const sortByReviews = {
      $sort: { "restaurant.review_count": sortDirectionValue },
    };

    return [sortByReviews];
  }
  // Sort by rating
  if (sortBy === SORT_KEY.RATING) {
    const sortByReviews = {
      $sort: { "restaurant.rating": sortDirectionValue },
    };

    return [sortByReviews];
  }
  // Sort by distance
  if (sortBy === SORT_KEY.DISTANCE) {
    // query defaulted to sort by distance
    const sortByDistance = {
      $sort: { "restaurant.distance": sortDirectionValue },
    };

    return [sortByDistance];
  }
  // Sort by average price
  if (sortBy === SORT_KEY.AVERAGE_PRICE) {
    const addAveragePriceField = {
      $addFields: { average_price: { $avg: "$foods.price" } },
    };
    const sortByAveragePrice = {
      $sort: { average_price: sortDirectionValue },
    };

    return [addAveragePriceField, sortByAveragePrice];
  }

  return NO_SORT;
}

// To be after a restaurant pipeline with populated foods
// Filters for restaurants containing foods in budget
function generateBudgetFoodsQuery(budget: number): any[] {
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

  return [filterFoodsInBudget, addFoodCountField, pickRestaurantsInBudget];
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
  const budgetFilter = generateBudgetFoodsQuery(budget);
  const sortQuery = generateSortQuery(sortBy, sortDirection);

  const limitRestaurants = generateRestaurantLimitQuery(skip, limit);

  const nearbyBudgetQuery: any[] = [
    nearbyQuery,
    ...restaurantFilters,
    ...populateFoodsQuery,
    ...budgetFilter,
    ...sortQuery,
    ...limitRestaurants,
  ];

  const [foundRestaurants]: any = await RestaurantModel.aggregate(
    nearbyBudgetQuery
  );

  return foundRestaurants;
}

async function findNearbyCategoriesInBudget(
  coordinates: Coordinates,
  searchRadius: Meters,
  budget: number
): Promise<FoodCategoryFrequency> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  const populateFoodsQuery = generatePopulateFoodsQuery();
  const budgetFilterQuery = generateBudgetFoodsQuery(budget);
  const groupCategoriesQuery = [
    {
      $facet: {
        food_categories: [
          { $unwind: "$restaurant.food_categories" },
          { $sortByCount: "$restaurant.food_categories" },
        ],
      },
    },
    {
      $project: {
        food_categories: true,
      },
    },
  ];

  const nearbyBudgetCategoriesQuery: any[] = [
    nearbyQuery,
    ...populateFoodsQuery,
    ...budgetFilterQuery,
    ...groupCategoriesQuery,
  ];

  const [foundCategories]: any = await RestaurantModel.aggregate(
    nearbyBudgetCategoriesQuery
  );

  type GroupedCategories = {
    _id: string;
    count: number;
  };

  return foundCategories.food_categories.map((category: GroupedCategories) => ({
    category: category._id,
    frequency: category.count,
  }));
}

// https://docs.google.com/spreadsheets/d/1PKuS3NW2jiiBOwFOndKke_yMO0mWMXbgmvuM4PIsW_k/edit#gid=1852208849
// From tests, the scoring algorithm with the highest correlation coefficient was: rating + log_10(reviews)
function sortByRestaurantRankQuery(): any[] {
  const addRankScore = {
    $addFields: {
      rank_score: { $add: [{ $log10: "$review_count" }, "$rating"] },
    },
  };
  const sortByHighestRankScore = {
    $sort: { rank_score: -1 },
  };

  return [addRankScore, sortByHighestRankScore];
}

async function findNearInBudgetRecommended(
  coordinates: Coordinates,
  searchRadius: Meters,
  budget: number,
  limit: number
): Promise<NearbyRestaurantsResult> {
  const nearbyQuery = generateNearbyQuery(coordinates, searchRadius);
  const rankRestaurantsQuery = sortByRestaurantRankQuery();
  const populateFoodsQuery = generatePopulateFoodsQuery();
  const budgetFilterQuery = generateBudgetFoodsQuery(budget);
  const limitRestaurants = generateRestaurantLimitQuery(0, limit);

  const nearbyBudgetRecommendedQuery: any[] = [
    nearbyQuery,
    ...rankRestaurantsQuery,
    ...populateFoodsQuery,
    ...budgetFilterQuery,
    ...limitRestaurants,
  ];

  const [foundRestaurants] = await RestaurantModel.aggregate(
    nearbyBudgetRecommendedQuery
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

type FoodCategoryFrequency = {
  category: string;
  frequency: number;
};

async function findFoodCategories(): Promise<any> {
  const allFoodCategories: string[] = await RestaurantModel.find({})
    .select({
      food_categories: 1,
      _id: 0,
    })
    .then((result: any[]) =>
      result.map((row: any) => row.food_categories).flat()
    );

  const foodCategoryFrequency: { [key: string]: number } = {};
  // compute frequency for each food category
  allFoodCategories.forEach((foodCategory) => {
    foodCategoryFrequency[foodCategory] =
      (foodCategoryFrequency[foodCategory] ?? 0) + 1;
  });

  const uniqueFoodCategories = Object.keys(foodCategoryFrequency);

  const frequencyPairs: FoodCategoryFrequency[] = uniqueFoodCategories.map(
    (foodCategory) => ({
      category: foodCategory,
      frequency: foodCategoryFrequency[foodCategory],
    })
  );

  return frequencyPairs.sort(
    (categoryA, categoryB) => categoryB.frequency - categoryA.frequency
  );
}

export default {
  create,
  upsert,
  exists,
  updateMenu,
  findNear,
  findNearWithinBudget,
  findNearbyCategoriesInBudget,
  findByYelpId,
  findFoodCategories,
  findNearInBudgetRecommended,
};
