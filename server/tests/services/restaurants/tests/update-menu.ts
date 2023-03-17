import RestaurantService from "../../../../src/services/restaurant";
import { MenuModel } from "../../../../src/models/Menu";
import { testMenu } from "../../constants/menus";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../utils";
import { expect } from "@jest/globals";

export async function testUpdateRestaurantMenu() {
  const restaurantId = await generateRestaurantId(testRestaurant);

  const menuIdA = await MenuModel.create({
    ...testMenu,
    restaurant_id: restaurantId,
    created_at: new Date(),
  }).then((menu) => menu._id);

  const menuIdB = await MenuModel.create({
    ...testMenu,
    restaurant_id: restaurantId,
    created_at: new Date(),
  }).then((menu) => menu._id);

  // set restaurant to use menuA
  const restaurantWithMenuA = await RestaurantService.updateMenu(
    restaurantId,
    menuIdA
  );

  expect(restaurantWithMenuA?.menu_id).toStrictEqual(menuIdA);

  // set restaurant to use menuB
  const restaurantWithMenuB = await RestaurantService.updateMenu(
    restaurantId,
    menuIdB
  );
  expect(restaurantWithMenuB?.menu_id).toStrictEqual(menuIdB);

  // menuA should be deprecated
  const updatedMenuA = await MenuModel.findById(menuIdA);
  expect(updatedMenuA?.deprecated).toBe(true);
}
