import { expect } from "@jest/globals";
import { ObjectId } from "mongoose";
import { testRestaurant } from "../../constants/restaurants";
import { TestMenuAttributes, testMenu } from "../../constants/menus";
import { TestFoodAttributes, manyTestFoods } from "../../constants/foods";
import { FoodAttributes, FoodModel } from "../../../../src/models/Food";
import {
  MenuAttributes,
  MenuDocument,
  MenuModel,
} from "../../../../src/models/Menu";
import MenuService from "../../../../src/services/menu";
import { isDisjoint } from "../../../utils";
import { generateRestaurantId } from "../../restaurants/utils";

export async function testDeleteDeprecated() {
  const testRestaurantId = await generateRestaurantId(testRestaurant);

  const someMenus: TestMenuAttributes[] = Array(4).fill(testMenu);
  const someMenusWithRestaurant: MenuAttributes[] = someMenus.map((menu) => ({
    ...menu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  }));

  const menuIds = await MenuModel.insertMany(someMenusWithRestaurant).then(
    (createdMenus: MenuDocument[]) => createdMenus.map((menu) => menu._id)
  );
  const foodSets: TestFoodAttributes[][] = Array(4).fill(manyTestFoods);
  const foodsWithForeignKeys: FoodAttributes[] = foodSets.flatMap(
    (foodSet, index) =>
      foodSet.map((food) => ({
        ...food,
        restaurant_id: testRestaurantId,
        menu_id: menuIds[index],
        created_at: new Date(),
      }))
  );

  const createdFoodIds = await FoodModel.insertMany(foodsWithForeignKeys).then(
    (created) => created.map((food) => food._id)
  );
  // grab three foods
  const foodsIdToDelete: ObjectId[] = createdFoodIds.slice(0, 3);

  const menuIdToDelete = menuIds[0];

  // assign foods to menu
  await MenuModel.findOneAndUpdate(
    { _id: menuIdToDelete },
    { foods: foodsIdToDelete }
  );

  // set menu to be deprecated
  const deprecatedMenu = await MenuModel.findOneAndUpdate(
    { _id: menuIdToDelete },
    { deprecated: true },
    { new: true }
  );

  expect(deprecatedMenu?.deprecated).toBe(true);

  const deleteResult = await MenuService.deleteDeprecatedMenus();
  expect(deleteResult).toEqual({
    deleted_foods_count: 3,
    deleted_menus_count: 1,
  });

  const remainingMenus = await MenuModel.find({});
  expect(remainingMenus.length).toBe(someMenus.length - 1);

  const remainingFoodIds = await FoodModel.find({}).then((foods) =>
    foods.map((food) => food._id)
  );
  const completelyMissing = isDisjoint(remainingFoodIds, foodsIdToDelete);
  expect(completelyMissing).toBe(true);
}
