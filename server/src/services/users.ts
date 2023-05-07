import { UserAttributes, UserModel } from "../models/User";

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

const UserService = {
  findOne,
  create,
  exists,
};

export default UserService;
