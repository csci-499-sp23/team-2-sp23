import MenuService from "../../../../src/services/menu";
import { testMenu } from "../../constants/menus";
import { testRestaurant } from "../../constants/restaurants";
import { generateRestaurantId } from "../../restaurants/utils";
import { expectInitialMenu } from "./utils";

export async function testCreateMenu() {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const createdMenu = await MenuService.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
  });

  expectInitialMenu(createdMenu!);
}
