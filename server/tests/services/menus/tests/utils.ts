import { expect } from "@jest/globals";
import { MenuDocument } from "../../../../src/models/Menu";

export function expectInitialMenu(menu: MenuDocument): void {
  expect(menu.created_at).toBeTruthy();
  expect(menu.deprecated).toBe(false);
  expect(menu.foods).toEqual([]);
  expect(menu.restaurant_id).toBeTruthy();
}
