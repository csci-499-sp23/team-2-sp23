import React from "react";
import { MarkerF } from "@react-google-maps/api";
import FocusedMarker from "./FocusedMarker";

export default function RestaurantMarkers({
  rows,
  showRestaurant,
  setMapCenter,
}) {
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState(null);
  const nonSelectedRestaurants = rows.filter(
    (row) => row.restaurant.yelp_id !== selectedRestaurantId
  );
  const selectedRestaurant = rows.find(
    (row) => row.restaurant.yelp_id === selectedRestaurantId
  );

  return (
    <>
      <FocusedMarker selectedRestaurant={selectedRestaurant} />
      {nonSelectedRestaurants.map((row) => {
        const { restaurant } = row;
        const coordinates = restaurant.location.coordinates;
        const [longitude, latitude] = coordinates;
        const restaurantPosition = {
          lng: longitude,
          lat: latitude,
        };
        return (
          <MarkerF
            key={restaurant.yelp_id}
            position={restaurantPosition}
            onClick={() => {
              showRestaurant(row);
              setSelectedRestaurantId(restaurant.yelp_id);
              setMapCenter(restaurantPosition);
            }}
          />
        );
      })}
    </>
  );
}
