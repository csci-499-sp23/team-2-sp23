export default function computeMidpoint(
  restaurantCoordinates,
  userCoordinates
) {
  const midpointCoordinates = {
    latitude: (restaurantCoordinates.latitude + userCoordinates.latitude) / 2,
    longitude:
      (restaurantCoordinates.longitude + userCoordinates.longitude) / 2,
  };
  return midpointCoordinates;
}
