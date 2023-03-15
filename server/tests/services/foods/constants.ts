import { FoodAttributes } from "../../../src/models/Food";

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

export const foodKeys = Object.keys(singleTestFood);
