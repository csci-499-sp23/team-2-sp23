import { ObjectId } from "mongoose";
import { MenuAttributes, MenuDocument, MenuModel } from "../models/Menu";
import { FoodDocument } from "../models/Food";

// Remove `| null` after completion*
async function create(menu: MenuAttributes): Promise<MenuDocument | null> {
  return null;
}

async function setFoods(
  menuId: ObjectId,
  foodIds: ObjectId[]
): Promise<MenuDocument | null> {
  return null;
}

async function getFoods(menuId: ObjectId): Promise<FoodDocument[] | null> {
  return null;
}

async function markDeprecated(menuId: ObjectId): Promise<MenuDocument | null> {
  return null;
}

export default {
  create,
  setFoods,
  getFoods,
  markDeprecated,
};
