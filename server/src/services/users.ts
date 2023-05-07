import { UserAttributes, UserModel } from "../models/User";

async function getUserByAuth0Id(
  auth0Id: string
): Promise<UserAttributes | null> {
  return await UserModel.findOne({ auth0_id: auth0Id });
}

async function create(user: UserAttributes): Promise<UserAttributes> {
  return UserModel.create({
    ...user,
    created_at: new Date(),
  });
}

const UserService = {
  getUserByAuth0Id,
  create,
};

export default UserService;
