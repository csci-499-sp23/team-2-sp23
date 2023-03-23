import { ObjectId, Schema, Model, model } from "mongoose";

export interface FoodItem {
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

export interface FoodAttributes extends FoodItem {
  restaurant_id: ObjectId;
  menu_id: ObjectId;
}

export interface FoodDocument extends FoodAttributes {
  _id: ObjectId;
  created_at: Date;
}

//templating the interface as a schema
export const FoodSchema: Schema<FoodDocument> = new Schema<FoodDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: false,
  },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  menu_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const FoodModel: Model<FoodDocument> = model("Food", FoodSchema);
