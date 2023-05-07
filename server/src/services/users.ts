import { UserAttributes, UserModel } from "../models/User";

async function getUserByAuth0Id(
  auth0Id: string
): Promise<UserAttributes | null> {
  return await UserModel.findOne({ auth0_id: auth0Id });
}

async function create(auth0Id: string): Promise<UserAttributes> {
  return UserModel.create({
    auth0_id: auth0Id,
    created_at: new Date(),
  });
}

async function exists(auth0Id: string): Promise<boolean> {
  const userExists = !!(await UserModel.count({ auth0_id: auth0Id }));
  return userExists;
}

const UserService = {
  getUserByAuth0Id,
  create,
  exists,
};

export default UserService;
