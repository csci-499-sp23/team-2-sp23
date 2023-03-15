import { expect } from "@jest/globals";
import { FoodDocument, FoodModel } from "../../../../src/models/Food";
import { MenuModel } from "../../../../src/models/Menu";
import { manyTestFoods } from "../../constants/foods";
import { testMenu } from "../../constants/menus";
import { generateRestaurantId } from "../../restaurants/utils";
import MenuService from "../../../../src/services/menu";
import { testRestaurant } from "../../constants/restaurants";
import { expectFoodEquality } from "../../foods/tests/utils";

export async function testRetrieveFoodsFromMenu() {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const someFoods = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  }));

  const createdMenu = await MenuModel.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  });

  const createdFoods: FoodDocument[] = await FoodModel.insertMany(someFoods);

  const updatedMenu = await MenuModel.findOneAndUpdate(
    { _id: createdMenu._id },
    { foods: createdFoods.map((food) => food._id) },
    { new: true }
  );

  expect(updatedMenu?.foods.length).toBe(someFoods.length);
  const retrievedFoods = await MenuService.getFoods(updatedMenu!._id);
  expect(retrievedFoods!.length).toBe(updatedMenu!.foods.length);

  retrievedFoods!.forEach((retrievedFood: FoodDocument, index) => {
    expectFoodEquality(retrievedFood, someFoods[index]);
  });
}
