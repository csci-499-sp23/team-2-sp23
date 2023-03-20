import { expect } from "@jest/globals";
import { FoodDocument, FoodModel } from "../../../../src/models/Food";
import FoodService from "../../../../src/services/food";
import { manyTestFoods } from "../../constants/foods";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { generateMenuId } from "../../menus/tests/utils";

export async function deleteFoodById() {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const menuId = await generateMenuId(restaurantId);

  const testFoodsWithRestaurantId = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: restaurantId,
    menu_id: menuId,
    created_at: new Date(),
  }));
  const createdFood: FoodDocument[] = await FoodModel.insertMany(
    testFoodsWithRestaurantId
  );

  const deleteCount = await FoodService.deleteFoodById(createdFood[1]._id);
  expect(deleteCount).toBe(1);

  const foundCount = await FoodModel.countDocuments({
    _id: createdFood[1]._id,
  });
  expect(foundCount).toBe(0);
}
