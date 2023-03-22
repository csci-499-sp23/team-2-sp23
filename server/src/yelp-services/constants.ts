/*
  yelpAPI returns at most 50 restaurants per call.
  There is a page option, but the result appear inconsistent per query.
  We'll use a fixed search radius to get a rough 100% encapsulation for restaurants in a location.
*/
export const OPTIMAL_SEARCH_RADIUS = 230;

// https://www.google.com/maps/search/40.768,-73.960
// Some location near Hunter College, used as the center for generating coordinates
export const CENTER_COORDINATES: Coordinates = {
  longitude: -73.960,
  latitude: 40.768,
};

// around 3-4 avenues
export const LONGITUDE_RANGE: number = 0.008;

// around 3-4 avenues
export const LATITUDE_RANGE: number = 0.008;
