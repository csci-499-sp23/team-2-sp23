import { ObjectId } from "mongoose";
import {
  Coordinates,
  RestaurantAttributes,
  RestaurantDocument,
} from "../models/Restaurant";

/* Remove `| null` after completion for each function */

async function create(
  restaurant: RestaurantAttributes
): Promise<RestaurantDocument | null> {
  return null;
}

async function updateMenu(
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
