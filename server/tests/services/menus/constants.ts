import { MenuAttributes } from "../../../src/models/Menu";

export const testMenu: Omit<MenuAttributes, "restaurant_id"> = {
  foods: [],
  deprecated: false,
};
