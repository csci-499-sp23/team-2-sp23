import { ObjectId, Schema, Model, model } from "mongoose";

export interface RestaurantLocation {
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RestaurantAttributes {
  yelp_id: string;
  name: string;
  alias: string;
  image_url: string;
  yelp_url: string;
  food_categories: string[];
  rating: number;
  review_count: number;
  coordinates: Coordinates;
  transactions: string[];
  price_category: string;
  location: RestaurantLocation;
  phone: string;
  display_phone: string;
  menu_id?: ObjectId;
}

export interface RestaurantDocument extends RestaurantAttributes {
  _id: ObjectId;
  created_at: Date;
}

export const RestaurantSchema: Schema<RestaurantDocument> =
  new Schema<RestaurantDocument>({
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    yelp_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    yelp_url: {
      type: String,
      required: false,
    },
    food_categories: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review_count: {
      type: Number,
      required: true,
    },
    coordinates: {
      type: Object,
      required: true,
    },
    transactions: {
      type: [String],
      required: true,
    },
    price_category: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    display_phone: {
      type: String,
      required: true,
    },
    menu_id: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Menu",
    },
    created_at: {
      type: Date,
      required: true,
    },
  });

export const RestaurantModel: Model<RestaurantDocument> =
  model<RestaurantDocument>("Restaurant", RestaurantSchema);
