import { ObjectId } from "mongoose";
import { MenuAttributes, MenuDocument, MenuModel } from "../models/Menu";
import { FoodDocument } from "../models/Food";

// Create a new menu
async function create(menu: MenuAttributes): Promise<MenuDocument> {
  return MenuModel.create({
    ...menu,
    created_at: new Date(),
  });
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
  return MenuModel.findOneAndUpdate(
    { _id: menuId },
    { deprecated: true },
    { new: true }
  );
}

export default {
  create,
  setFoods,
  getFoods,
  markDeprecated,
};
