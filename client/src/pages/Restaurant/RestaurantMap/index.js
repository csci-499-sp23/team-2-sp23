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
  const [userCoordinates, setUserCoordinates] = useState([]);

  const mapOptions = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: false,
    streetViewControl: false,
  };

  React.useEffect(() => {
    if (!map) return;
    getUserCoordinates()
      .then((result) => {
        setUserCoordinates(result);
        const restaurantCoordinates = {
          longitude: restaurantLongitude,
          latitude: restaurantLatitude,
        };
        const midpoint = computeMidpoint(
          restaurantCoordinates,
          userCoordinates
        );

        map.setCenter({
          lat: midpoint.latitude,
          lng: midpoint.longitude,
        });
      })
      .catch(() => {
        map.setCenter({
          lat: restaurantLatitude,
          lng: restaurantLongitude,
        });
      });
  }, [map, restaurantLatitude, restaurantLongitude, userCoordinates]);

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
      <UserMarker
        latitude={userCoordinates.latitude}
        longitude={userCoordinates.longitude}
      />
    </GoogleMap>
  );
}

export default React.memo(Map);
