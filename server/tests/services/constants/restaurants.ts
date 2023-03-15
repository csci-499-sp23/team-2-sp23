import { RestaurantAttributes } from "../../../src/models/Restaurant";

export const testRestaurant: RestaurantAttributes = {
  yelp_id: "oe8GEFE4QLFAKt87y7zcgA",
  alias: "very-fresh-noodles-new-york",
  name: "Very Fresh Noodles",
  image_url:
    "https://s3-media2.fl.yelpcdn.com/bphoto/gRqfWsSDep7gFKGE4lChBQ/o.jpg",
  yelp_url: "https://www.yelp.com/biz/very-fresh-noodles-new-york",
  food_categories: ["Taiwanese", "Chinese", "Noodles"],
  review_count: 1350,
  rating: 4.5,
  location: {
    type: "Point",
    coordinates: [-74.00565, 40.74207],
  },
  transactions: ["pickup", "delivery"],
  price_category: "$$",
  address: {
    address1: "409 W 15th St",
    address2: null,
    address3: "",
    city: "New York",
    zip_code: "10011",
    country: "US",
    state: "NY",
    display_address: ["409 W 15th St", "New York, NY 10011"],
  },
  phone: "+13322156161",
  display_phone: "(332) 215-6161",
};
