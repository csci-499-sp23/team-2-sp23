import { FoodAttributes } from "../../../src/models/Food";
import { RestaurantAttributes } from "../../../src/models/Restaurant";

type TestFoodAttributes = Omit<FoodAttributes, "restaurant_id">;

export const singleTestFood: TestFoodAttributes = {
  name: "test food name",
  description: "test food description",
  image_url: "test food image",
  price: 5.55,
};

export const manyTestFoods: TestFoodAttributes[] = [
  {
    name: "test food name1",
    description: "test food description1",
    image_url: "test food image1",
    price: 1.11,
  },
  {
    name: "test food name2",
    description: null,
    image_url: "test food image2",
    price: 2.22,
  },
  {
    name: "test food name3",
    description: "test food description3",
    image_url: null,
    price: 3.33,
  },
]; 

export const testRestaurant: RestaurantAttributes = {
  yelp_id: "oe8GEFE4QLFAKt87y7zcgA",
  alias: "very-fresh-noodles-new-york",
  name: "Very Fresh Noodles",
  image_url:
    "https://s3-media2.fl.yelpcdn.com/bphoto/gRqfWsSDep7gFKGE4lChBQ/o.jpg",
  yelp_url: "https://www.yelp.com/biz/very-fresh-noodles-new-york",
  food_categories: ["Taiwanese", "Chinese", "Noodles"],
  review_count: 1350,
  rating: 4.5,
  coordinates: {
    latitude: 40.74207,
    longitude: -74.00565,
  },
  transactions: ["pickup", "delivery"],
  price_category: "$$",
  location: {
    address1: "409 W 15th St",
    address2: null,
    address3: "",
    city: "New York",
    zip_code: "10011",
    country: "US",
    state: "NY",
    display_address: ["409 W 15th St", "New York, NY 10011"],
  },
  phone: "+13322156161",
  display_phone: "(332) 215-6161",
};

export const foodKeys = Object.keys(singleTestFood);
