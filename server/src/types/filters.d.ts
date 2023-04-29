declare enum FILTERS {
  FOOD_CATEGORY = "food_category",
  PRICE_CATEGORY = "price_category",
  TRANSACTIONS = "transactions",
}

type PriceCategory = "$" | "$$" | "$$$" | "$$$$";
type FoodCategory = string;
type TransactionCategory = "delivery" | "pickup" | "restaurant_reservation";

type RestaurantFilterOptions = {
  price_categories: PriceCategory[];
  food_categories: string[];
  transactions: TransactionCategory[];
};
type RestaurantFilter = Partial<RestaurantFilterOptions>;
