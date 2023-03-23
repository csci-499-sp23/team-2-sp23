import { ObjectId } from "mongoose";
import { MenuAttributes, MenuDocument, MenuModel } from "../models/Menu";
import { FoodDocument, FoodModel } from "../models/Food";

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
  return MenuModel.findOneAndUpdate(
    { _id: menuId },
    { foods: foodIds },
    { new: true }
  );
}

async function getFoods(menuId: ObjectId): Promise<FoodDocument[] | null> {
  return MenuModel.findById(menuId)
    .populate("foods")
    .then((menu: MenuDocument | null) => menu?.foods) as Promise<
    FoodDocument[] | null
  >;
}

async function markDeprecated(menuId: ObjectId): Promise<MenuDocument | null> {
  return MenuModel.findOneAndUpdate(
    { _id: menuId },
    { deprecated: true },
    { new: true }
  );
}

async function deleteDeprecatedMenus(): Promise<void> {
  const deprecatedMenus = await MenuModel.find({ deprecated: true });
  const allDeprecatedMenuIds = deprecatedMenus.map((menu) => menu._id);

  FoodModel.deleteMany({ menu_id: { $in: allDeprecatedMenuIds } });
  MenuModel.deleteMany({ _id: { $in: allDeprecatedMenuIds } });
}

export default {
  create,
  setFoods,
  getFoods,
  markDeprecated,
  deleteDeprecatedMenus,
};
