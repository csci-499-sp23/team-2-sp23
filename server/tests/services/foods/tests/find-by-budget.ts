import { expect } from "@jest/globals";
import { FoodModel } from "../../../../src/models/Food";
import FoodService from "../../../../src/services/food";
import { manyTestFoods } from "../../constants/foods";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { expectFoodEquality } from "../utils";
import { generateMenuId } from "../../menus/utils";

export async function findFoodsWithinBudget() {
  const BUDGET = 3;
  const budgetQuery = { price: { $lte: BUDGET } };

  const restaurantId = await generateRestaurantId(testRestaurant);
  const menuId = await generateMenuId(restaurantId);

  const testFoodsWithRestaurantId = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: restaurantId,
    menu_id: menuId,
    created_at: new Date(),
  }));

  // insert some food
  await FoodModel.insertMany(testFoodsWithRestaurantId);

  const foodsWithinBudget = await FoodModel.find(budgetQuery);
  const retrievedFoods = await FoodService.findAll(budgetQuery);

  expect(retrievedFoods.length).toBe(foodsWithinBudget.length);
  // ensure exact match
  retrievedFoods.forEach((retrievedFood, index) => {
    const expectedFood = foodsWithinBudget[index];

    expect(retrievedFood!._id).toStrictEqual(expectedFood._id);
    expect(retrievedFood!.created_at).toStrictEqual(expectedFood.created_at);
    expectFoodEquality(retrievedFood!, expectedFood);
  });
}
