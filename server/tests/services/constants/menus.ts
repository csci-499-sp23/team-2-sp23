import { MenuAttributes } from "../../../src/models/Menu";

export type TestMenuAttributes = Omit<MenuAttributes, "restaurant_id">;

export const testMenu: TestMenuAttributes = {
  foods: [],
  deprecated: false,
};
