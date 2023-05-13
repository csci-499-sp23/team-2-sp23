import { Schema, Model, model } from "mongoose";

export interface PreferenceAttributes {
  restaurant_id1: number;
  rating1: number;
  reviews1: number;
  restaurant_id2: number;
  rating2: number;
  reviews2: number;
  preference: number;
}

export const PreferenceSchema: Schema<PreferenceAttributes> = new Schema({
  restaurant_id1: {
    type: Number,
    required: true,
  },
  rating1: {
    type: Number,
    required: true,
  },
  reviews1: {
    type: Number,
    required: true,
  },
  restaurant_id2: {
    type: Number,
    required: true,
  },
  rating2: {
    type: Number,
    required: true,
  },
  reviews2: {
    type: Number,
    required: true,
  },
  preference: {
    type: Number,
    required: true,
  },
});

export const PreferenceModel: Model<PreferenceAttributes> =
  model<PreferenceAttributes>("Preference", PreferenceSchema);
