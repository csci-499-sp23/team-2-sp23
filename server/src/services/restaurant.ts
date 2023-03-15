import { ObjectId } from "mongoose";
import {
  Coordinates,
  RestaurantAttributes,
  RestaurantDocument,
  RestaurantModel,
} from "../models/Restaurant";

// Remove `| null` after completion
async function create(
  restaurant: RestaurantAttributes
): Promise<RestaurantDocument | null> {
  return null;
}

async function updateMenu(
  restaurantId: ObjectId,
  menuId: ObjectId
): Promise<RestaurantDocument | null> {
  return null;
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
