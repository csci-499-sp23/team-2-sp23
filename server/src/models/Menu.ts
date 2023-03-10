import mongoose, { ObjectId, Schema, Model, model } from "mongoose";

export interface MenuAttributes {
  _id: ObjectId;
  foods: ObjectId[];
  created_at: Date;
}

export const MenuSchema: Schema<MenuAttributes> = new Schema<MenuAttributes>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  foods: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Food",
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const MenuModel: Model<MenuAttributes> = model<MenuAttributes>("Menu", MenuSchema);
