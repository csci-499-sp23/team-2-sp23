import { ObjectId } from "mongoose";
import {
  Coordinates,
  RestaurantAttributes,
  RestaurantDocument,
  RestaurantModel,
} from "../models/Restaurant";
import { MenuModel } from "../models/Menu";

async function create(
  restaurant: RestaurantAttributes
): Promise<RestaurantDocument | null> {
  return RestaurantModel.create({
    ...restaurant,
    created_at: new Date(),
  });
}

async function updateMenu(
  restaurantId: ObjectId,
  menuId: ObjectId
): Promise<RestaurantDocument | null> {
  const restaurant = await RestaurantModel.findById(restaurantId);
  await MenuModel.findOneAndUpdate(
    { _id: restaurant?.menu_id },
    { deprecated: true }
  );

  return RestaurantModel.findOneAndUpdate(
    { _id: restaurantId },
    { menu_id: menuId },
    { new: true }
  );
}

type Meters = number;
async function findNear(
  coordinates: Coordinates,
  searchRadius: Meters
): Promise<RestaurantDocument[] | null> {
  return null;
}

export default {
  create,
  updateMenu,
  findNear,
};
