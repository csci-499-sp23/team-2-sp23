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

async function getFoods(menuId: ObjectId): Promise<FoodDocument[]> {
  return MenuModel.findById(menuId)
    .populate("foods")
    .then((menu: MenuDocument | null) => menu?.foods) as Promise<
    FoodDocument[]
  >;
}

async function markDeprecated(menuId: ObjectId): Promise<MenuDocument | null> {
  return MenuModel.findOneAndUpdate(
    { _id: menuId },
    { deprecated: true },
    { new: true }
  );
}

interface DeletionResult {
  deleted_foods_count: number;
  deleted_menus_count: number;
}
async function deleteDeprecatedMenus(): Promise<DeletionResult> {
  const deprecatedMenus = await MenuModel.find({ deprecated: true });
  const allDeprecatedMenuIds = deprecatedMenus.map((menu) => menu._id);

  const deletedFoodsCount = await FoodModel.deleteMany({
    menu_id: { $in: allDeprecatedMenuIds },
  }).then((res) => res.deletedCount);
  const deletedMenusCount = await MenuModel.deleteMany({
    _id: { $in: allDeprecatedMenuIds },
  }).then((res) => res.deletedCount);

  return {
    deleted_foods_count: deletedFoodsCount,
    deleted_menus_count: deletedMenusCount,
  };
}

export default {
  create,
  setFoods,
  getFoods,
  markDeprecated,
  deleteDeprecatedMenus,
};
