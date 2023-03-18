import { RestaurantAttributes } from "../../../src/models/Restaurant";
import {
  YelpRestaurant,
  yelpRestaurantParser,
} from "../../../src/middleware/yelp-utils";

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

const yelpRestaurants: YelpRestaurant[] = [
  {
    id: "oe8GEFE4QLFAKt87y7zcgA",
    alias: "very-fresh-noodles-new-york",
    name: "Very Fresh Noodles",
    image_url:
      "https://s3-media2.fl.yelpcdn.com/bphoto/gRqfWsSDep7gFKGE4lChBQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/very-fresh-noodles-new-york?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 1350,
    categories: [
      {
        alias: "taiwanese",
        title: "Taiwanese",
      },
      {
        alias: "chinese",
        title: "Chinese",
      },
      {
        alias: "noodles",
        title: "Noodles",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 40.74207,
      longitude: -74.00565,
    },
    transactions: ["pickup", "delivery"],
    price: "$$",
    location: {
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
    distance: 4539.174753743569,
  },
  {
    id: "Pr-q47vsmM4aoc2t_Sfk8w",
    alias: "momofuku-noodle-bar-uptown-new-york",
    name: "Momofuku Noodle Bar - Uptown",
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/h08ukV9YwJXhQBT2kvCCIg/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/momofuku-noodle-bar-uptown-new-york?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 519,
    categories: [
      {
        alias: "newamerican",
        title: "American (New)",
      },
      {
        alias: "noodles",
        title: "Noodles",
      },
      {
        alias: "ramen",
        title: "Ramen",
      },
    ],
    rating: 4.0,
    coordinates: {
      latitude: 40.76802583631109,
      longitude: -73.9829243,
    },
    transactions: [],
    price: "$$",
    location: {
      address1: "10 Columbus Cir",
      address2: "Third Floor",
      address3: null,
      city: "New York",
      zip_code: "10019",
      country: "US",
      state: "NY",
      display_address: ["10 Columbus Cir", "Third Floor", "New York, NY 10019"],
    },
    phone: "",
    display_phone: "",
    distance: 1510.4093934979205,
  },
  {
    id: "TswtgsaC8VgQv0VDonFOTg",
    alias: "taco-vista-new-york-2",
    name: "Taco Vista",
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/vN9wZvOllEnnWvJoafjiNA/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/taco-vista-new-york-2?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 69,
    categories: [
      {
        alias: "mexican",
        title: "Mexican",
      },
      {
        alias: "bars",
        title: "Bars",
      },
      {
        alias: "tex-mex",
        title: "Tex-Mex",
      },
    ],
    rating: 3.5,
    coordinates: {
      latitude: 40.692755886949,
      longitude: -74.0145479142666,
    },
    transactions: [],
    location: {
      address1: "140 Carder Rd",
      address2: "",
      address3: null,
      city: "New York",
      zip_code: "10004",
      country: "US",
      state: "NY",
      display_address: ["140 Carder Rd", "New York, NY 10004"],
    },
    phone: "",
    display_phone: "",
    distance: 9439.14859044064,
  },
  {
    id: "e64Y17DJgjotSz8B9gEI7Q",
    alias: "ugly-baby-brooklyn-3",
    name: "Ugly Baby",
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/eXoFQyWNREOUbBaPK2UrXA/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/ugly-baby-brooklyn-3?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 425,
    categories: [
      {
        alias: "thai",
        title: "Thai",
      },
      {
        alias: "bars",
        title: "Bars",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 40.67795,
      longitude: -73.9961,
    },
    transactions: ["delivery"],
    price: "$$$",
    location: {
      address1: "407 Smith St",
      address2: null,
      address3: "",
      city: "Brooklyn",
      zip_code: "11231",
      country: "US",
      state: "NY",
      display_address: ["407 Smith St", "Brooklyn, NY 11231"],
    },
    phone: "+13476893075",
    display_phone: "(347) 689-3075",
    distance: 10452.103201139184,
  },
  {
    id: "LFxzGHDCeNOsfPpX2Ja2KQ",
    alias: "kong-sihk-tong-queens",
    name: "Kong Sihk Tong",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/8jiDGnum5EEwVDxswEBWJQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/kong-sihk-tong-queens?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 90,
    categories: [
      {
        alias: "hkcafe",
        title: "Hong Kong Style Cafe",
      },
    ],
    rating: 4.0,
    coordinates: {
      latitude: 40.7544616479961,
      longitude: -73.82769517600536,
    },
    transactions: [],
    price: "$$",
    location: {
      address1: "42-35 Main St",
      address2: "Ste 1A",
      address3: null,
      city: "Queens",
      zip_code: "11355",
      country: "US",
      state: "NY",
      display_address: ["42-35 Main St", "Ste 1A", "Queens, NY 11355"],
    },
    phone: "+19292753730",
    display_phone: "(929) 275-3730",
    distance: 11677.219760478623,
  },
  {
    id: "7YYp_2WYWdRSt_NohV7Psw",
    alias: "casa-birria-nyc-new-york",
    name: "Casa Birria NYC",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/koyMTX0E-LNBnuV8-_q7uw/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/casa-birria-nyc-new-york?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 91,
    categories: [
      {
        alias: "foodtrucks",
        title: "Food Trucks",
      },
      {
        alias: "tacos",
        title: "Tacos",
      },
    ],
    rating: 5.0,
    coordinates: {
      latitude: 40.778824,
      longitude: -73.953986,
    },
    transactions: ["delivery"],
    price: "$",
    location: {
      address1: "86th & 3rd Ave",
      address2: "",
      address3: null,
      city: "New York",
      zip_code: "10028",
      country: "US",
      state: "NY",
      display_address: ["86th & 3rd Ave", "New York, NY 10028"],
    },
    phone: "+16468682090",
    display_phone: "(646) 868-2090",
    distance: 1442.4644187466627,
  },
  {
    id: "qVlDLz8Ri-ThAFJgYHuQ9A",
    alias: "omusubi-gonbei-new-york-3",
    name: "Omusubi Gonbei",
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/fB9UIhwdiNcMoK6PBLowoQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/omusubi-gonbei-new-york-3?adjust_creative=QcXEl5FGPQnb42C4ddqFoQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=QcXEl5FGPQnb42C4ddqFoQ",
    review_count: 109,
    categories: [
      {
        alias: "japanese",
        title: "Japanese",
      },
      {
        alias: "foodstands",
        title: "Food Stands",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 40.750701,
      longitude: -73.976961,
    },
    transactions: ["delivery"],
    price: "$",
    location: {
      address1: "370 Lexington Ave",
      address2: "",
      address3: null,
      city: "New York",
      zip_code: "10017",
      country: "US",
      state: "NY",
      display_address: ["370 Lexington Ave", "New York, NY 10017"],
    },
    phone: "+19174727168",
    display_phone: "(917) 472-7168",
    distance: 2254.3951201609375,
  },
];

export const testRestaurants = yelpRestaurants.map((restaurant) =>
  yelpRestaurantParser(restaurant)
);
