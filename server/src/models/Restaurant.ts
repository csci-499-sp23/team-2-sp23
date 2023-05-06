import { ObjectId, Schema, Model, model } from "mongoose";

export interface RestaurantAddress {
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

type Longitude = number;
type Latitude = number;
export type Coordinates = [Longitude, Latitude];
export interface Location {
  type: string;
  coordinates: Coordinates;
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
  location: Location;
  transactions: string[];
  price_category?: string | null;
  address: RestaurantAddress;
  phone: string;
  display_phone: string;
  menu_id?: ObjectId;
}

export interface RestaurantDocument extends RestaurantAttributes {
  _id: ObjectId;
  created_at: Date;
  updated_at?: Date;
  saved_by: ObjectId[] | null;
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
    location: {
      type: Object,
      required: true,
    },
    transactions: {
      type: [String],
      required: true,
    },
    price_category: {
      type: String,
      required: false,
    },
    address: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    display_phone: {
      type: String,
      required: false,
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
    updated_at: {
      type: Date,
      required: false,
    },
    saved_by: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "User",
    },
  });

RestaurantSchema.index({
  location: "2dsphere",
});

export const RestaurantModel: Model<RestaurantDocument> =
  model<RestaurantDocument>("Restaurant", RestaurantSchema);
