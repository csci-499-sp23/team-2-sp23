import React, { useState } from "react";
import Map from "./Map";
import RestaurantPreview from "./RestaurantPreview";

export default function MapView({ longitude, latitude, rows, updateFields }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [showing, setShowing] = useState(false);

  function handleShowRestaurant(restaurant) {
    setSelectedRestaurant(restaurant);
    setShowing(true);
  }

  return (
    <>
      <Map
        longitude={longitude}
        latitude={latitude}
        rows={rows}
        updateFields={updateFields}
        showRestaurant={handleShowRestaurant}
      />
      {!!showing && <RestaurantPreview restaurant={selectedRestaurant} />}
    </>
  );
}
