import { UserAttributes, UserModel } from "../models/User";
import { ObjectId } from "mongoose";
import { RestaurantModel } from "../models/Restaurant";

async function findOne(query: any): Promise<UserAttributes | null> {
  return await UserModel.findOne(query);
}

async function create(auth0Id: string): Promise<UserAttributes> {
  return UserModel.create({
    auth0_id: auth0Id,
    created_at: new Date(),
  });
}

async function exists(query: any): Promise<boolean> {
  const userExists = !!(await UserModel.count(query));
  return userExists;
}

async function saveRestaurant(
  userId: ObjectId,
  restaurantId: ObjectId
): Promise<UserAttributes | null> {
  const user = await UserModel.findById(userId);
  const restaurant = await RestaurantModel.findById(restaurantId);
  user?.saved_restaurants.push(restaurantId);
  restaurant?.saved_by?.push(userId);
  return user;
}

const UserService = {
  findOne,
  create,
  exists,
  saveRestaurant,
};

export default UserService;
