import { ObjectId, Schema, Model, model } from "mongoose";

export interface FoodAttributes {
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
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
  created_at: {
    type: Date,
    required: true,
  },
});

export const FoodModel: Model<FoodDocument> = model("Food", FoodSchema);
