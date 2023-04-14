import React, { useEffect, useState } from "react";
import Map from "./Map";
import RestaurantPreview from "./RestaurantPreview";
import useDirectionService from "../../../hooks/useDirectionService";

export default function MapView({
  longitude,
  latitude,
  rows,
  updateFields,
  setModalFoods,
  openModal,
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [showing, setShowing] = useState(false);

  const restaurants = rows.map((row) => row.restaurant);

  function handleShowRestaurant(restaurant) {
    setSelectedRestaurant(restaurant);
    setShowing(true);
  }

  function handleHideRestaurant() {
    setShowing(false);
  }

  const { navigationPath, navigationSteps, navigate } = useDirectionService({
    restaurants,
  });

  useEffect(() => {
    navigate({ longitude, latitude }, restaurants);
    console.log(navigationPath);
  }, [rows]);

  return (
    <>
      {navigationSteps &&
        navigationSteps.map((step) => {
          const { distance, duration, steps } = step;
          console.log(step.steps[0].path);
          return (
            <div>
              {distance.text} {duration.text}
              {/* {steps.map((s) => (
                <div dangerouslySetInnerHTML={{ __html: s.instructions }} />
              ))} */}
            </div>
          );
        })}
      <Map
        longitude={longitude}
        latitude={latitude}
        rows={rows}
        updateFields={updateFields}
        showRestaurant={handleShowRestaurant}
        path={navigationPath}
      />
      {!!showing && (
        <RestaurantPreview
          restaurant={selectedRestaurant}
          hideRestaurant={handleHideRestaurant}
          setModalFoods={setModalFoods}
          openModal={openModal}
        />
      )}
    </>
  );
}
