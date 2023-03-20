import { expect } from "@jest/globals";
import { MenuDocument, MenuModel } from "../../../../src/models/Menu";
import { ObjectId } from "mongoose";
import { testMenu } from "../../constants/menus";

export function expectInitialMenu(menu: MenuDocument): void {
  expect(menu.created_at).toBeTruthy();
  expect(menu.deprecated).toBe(false);
  expect(menu.foods).toEqual([]);
  expect(menu.restaurant_id).toBeTruthy();
}

export async function generateMenuId(
  restaurantId: ObjectId
): Promise<ObjectId> {
  return MenuModel.create({
    ...testMenu,
    restaurant_id: restaurantId,
    created_at: new Date(),
  }).then((document) => document._id);
}
