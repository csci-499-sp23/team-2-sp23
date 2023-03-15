import { ObjectId, Schema, Model, model } from "mongoose";

export interface MenuAttributes {
  foods: ObjectId[];
  deprecated: false;
  restaurant_id: ObjectId;
}

export interface MenuDocument extends MenuAttributes {
  _id: ObjectId;
  created_at: Date;
}

export const MenuSchema: Schema<MenuDocument> = new Schema<MenuDocument>({
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
  deprecated: {
    type: Boolean,
    default: false,
    required: true,
  },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const MenuModel: Model<MenuDocument> = model<MenuDocument>(
  "Menu",
  MenuSchema
);
