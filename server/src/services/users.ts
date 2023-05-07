import { UserAttributes, UserModel } from "../models/User";

async function getUserByAuth0Id(
  auth0Id: string
): Promise<UserAttributes | null> {
  return await UserModel.findOne({ auth0_id: auth0Id });
}

const UserService = {
  getUserByAuth0Id,
};

export default UserService;
