import { expect } from "@jest/globals";
import { FoodModel } from "../../../../src/models/Food";
import { MenuModel } from "../../../../src/models/Menu";
import MenuService from "../../../../src/services/menu";
import { manyTestFoods } from "../../constants/foods";
import { testMenu } from "../../constants/menus";
import { generateRestaurantId } from "../../restaurants/utils";
import { testRestaurant } from "../../constants/restaurants";

export async function testSetFoodsToMenu() {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const createdMenu = await MenuModel.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  });

  const validFoods = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  }));

  const foodIds = await FoodModel.insertMany(validFoods).then((foods) =>
    foods.map((food) => food._id)
  );

  const updatedMenu = await MenuService.setFoods(createdMenu!._id, foodIds);
  expect(updatedMenu?.foods).toEqual(foodIds);
}
