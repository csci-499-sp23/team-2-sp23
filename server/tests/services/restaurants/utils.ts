import { ObjectId } from "mongoose";
import {
  RestaurantAttributes,
  RestaurantModel,
} from "../../../src/models/Restaurant";

export async function generateRestaurantId(
  restaurant: RestaurantAttributes
): Promise<ObjectId> {
  return RestaurantModel.create({
    ...restaurant,
    created_at: new Date(),
  }).then((restaurant) => restaurant._id)!;
}
