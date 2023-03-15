import { ObjectId } from "mongoose";
import { MenuAttributes, MenuDocument } from "../models/Menu";

/* Remove `| null` after completion for each function */

async function create(menu: MenuAttributes): Promise<MenuDocument | null> {
  return null;
}

async function insertMany(
  menuId: ObjectId,
  foodIds: ObjectId[]
): Promise<MenuDocument | null> {
  return null;
}

async function getFoods(menuId: ObjectId): Promise<MenuDocument | null> {
  return null;
}

async function markDeprecated(menuId: ObjectId): Promise<MenuDocument | null> {
  return null;
}

export default {
  create,
  insertMany,
  getFoods,
  markDeprecated,
};
