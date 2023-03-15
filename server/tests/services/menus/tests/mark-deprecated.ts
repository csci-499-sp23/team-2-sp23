import { expect } from "@jest/globals";
import { MenuModel } from "../../../../src/models/Menu";
import MenuService from "../../../../src/services/menu";
import { testMenu } from "../../constants/menus";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { expectInitialMenu } from "./utils";

export async function testMarkDeprecated() {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const createdMenu = await MenuModel.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  });

  expectInitialMenu(createdMenu);
  const updatedMenu = await MenuService.markDeprecated(createdMenu._id);
  expect(updatedMenu!.deprecated).toBe(true);
}
