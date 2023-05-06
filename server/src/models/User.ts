import { ObjectId, Schema, Model, model } from "mongoose";

export interface UserAttributes {
  _id: ObjectId;
  auth0_id: string;
  saved_restaurants: ObjectId[];
  created_at: Date;
}

export const UserSchema: Schema<UserAttributes> = new Schema<UserAttributes>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  auth0_id: {
    type: String,
    required: true,
  },
  saved_restaurants: {
    type: [Schema.Types.ObjectId],
    default: [],
    required: true,
    ref: "Restaurant",
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const UserModel: Model<UserAttributes> = model<UserAttributes>(
  "User",
  UserSchema
);
