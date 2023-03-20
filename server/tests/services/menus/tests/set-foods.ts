import { expect } from "@jest/globals";
import { FoodAttributes, FoodModel } from "../../../../src/models/Food";
import MenuService from "../../../../src/services/menu";
import { manyTestFoods } from "../../constants/foods";
import { generateRestaurantId } from "../../restaurants/utils";
import { testRestaurant } from "../../constants/restaurants";
import { generateMenuId } from "./utils";

export async function testSetFoodsToMenu() {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const menuId = await generateMenuId(restaurantId);

  const validFoods: FoodAttributes[] = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: restaurantId,
    menu_id: menuId,
    created_at: new Date(),
  }));

  const foodIds = await FoodModel.insertMany(validFoods).then((foods) =>
    foods.map((food) => food._id)
  );

  const updatedMenu = await MenuService.setFoods(menuId, foodIds);
  expect(updatedMenu?.foods).toEqual(foodIds);
}
