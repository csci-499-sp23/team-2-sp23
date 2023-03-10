import mongoose, { ObjectId, Schema, Model, model } from "mongoose";

export interface FoodAttributes {
  _id: ObjectId;
  name: string;
  description?: string;
  price: number;
}

//templating the interface as a schema
export const FoodSchema: Schema<FoodAttributes> = new Schema<FoodAttributes>({
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
});

export const FoodModel: Model<FoodAttributes> = model("Food", FoodSchema);
