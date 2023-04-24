import React, { useState } from "react";
import Map from "./Map";
import RestaurantPreview from "./RestaurantPreview";

export default function MapView({
  longitude,
  latitude,
  rows,
  updateFields,
  setModalFoods,
  openModal,
  searchRadius
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [restaurantFoods, setRestaurantFoods] = useState([]);
  const [showing, setShowing] = useState(false);

  function handleShowRestaurant(row) {
    setSelectedRestaurant(row.restaurant);
    setRestaurantFoods(row.foods);
    setShowing(true);
  }

  function handleHideRestaurant() {
    setShowing(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <Map
        longitude={longitude}
        latitude={latitude}
        rows={rows}
        updateFields={updateFields}
        showRestaurant={handleShowRestaurant}
        searchRadius={searchRadius}
      />
      {showing && (
        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <RestaurantPreview
            restaurant={selectedRestaurant}
            foods={restaurantFoods}
            hideRestaurant={handleHideRestaurant}
            setModalFoods={setModalFoods}
            openModal={openModal}
          />
        </div>
      )}
    </div>
  );
}
