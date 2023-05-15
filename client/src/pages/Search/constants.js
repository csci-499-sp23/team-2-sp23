export const HUNTER_COLLEGE_COORDINATES = {
  longitude: -73.9645291,
  latitude: 40.7678398,
};

export const HUNTER_COLLEGE_ADDRESS =
  "Hunter College, Park Avenue, New York, NY, USA";

export const DEFAULT_SEARCH_QUERY = {
  ...HUNTER_COLLEGE_COORDINATES,
  meters: 300,
  budget: 10,
  sort_by: "distance",
  sort_dir: "asc",
  price_categories: [],
};

export const DEFAULT_PRICE_FILTER = {
  $: false,
  $$: false,
  $$$: false,
  $$$$: false,
};

export const SEARCH_LOCATION_TYPES = ["places"];
