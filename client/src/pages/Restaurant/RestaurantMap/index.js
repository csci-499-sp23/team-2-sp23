/*global google*/
import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import RestaurantMarker from "./RestaurantMarker";
import UserMarker from "./UserMarker";
import getUserCoordinates from "../../../utils/getUserCoordinates";
import computeMidpoint from "../../../utils/computeMidpoint";

const containerStyle = {
  width: "100%",
  height: "30vh",
};

function Map({ restaurantLatitude, restaurantLongitude }) {
  const [map, setMap] = React.useState(null);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const restaurantCoordinates = {
    latitude: restaurantLatitude,
    longitude: restaurantLongitude,
  };

  const mapOptions = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: false,
    streetViewControl: false,
  };

  async function updateUserCoordinates() {
    const retrievedCoordinates = await getUserCoordinates().catch(() => null);
    if (!retrievedCoordinates) return;

    setUserCoordinates({
      longitude: retrievedCoordinates.longitude,
      latitude: retrievedCoordinates.latitude,
    });
  }

  // Update user coordinates on map and component load
  React.useEffect(() => {
    updateUserCoordinates();
  }, [map]);

  // Update map center on user coordinates change
  React.useEffect(() => {
    if (!map) return;
    if (!userCoordinates) {
      map.setCenter({
        lat: restaurantCoordinates.latitude,
        lng: restaurantCoordinates.longitude,
      });
    } else {
      const midpoint = computeMidpoint(restaurantCoordinates, userCoordinates);
      map.setCenter({
        lat: midpoint.latitude,
        lng: midpoint.longitude,
      });
    }
    // eslint-disable-next-line
  }, [userCoordinates]);

  return (
    <GoogleMap
      state={map}
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        map.setZoom(12);
        map.setCenter({ lat: restaurantLatitude, lng: restaurantLongitude });
        setMap(map);
      }}
      onUnmount={() => setMap(null)}
      options={mapOptions}
    >
      <RestaurantMarker
        latitude={restaurantLatitude}
        longitude={restaurantLongitude}
      />
      {!!userCoordinates && (
        <UserMarker
          latitude={userCoordinates.latitude}
          longitude={userCoordinates.longitude}
        />
      )}
    </GoogleMap>
  );
}

export default React.memo(Map);
