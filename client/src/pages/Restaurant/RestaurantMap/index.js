/*global google*/
import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import RestaurantMarker from "./RestaurantMarker";
import UserMarker from "./UserMarker";
import { useState } from "react";
import getUserCoordinates from "../../../utils/getUserCoordinates";

async function getCoordinates() {
  const coordinates = await getUserCoordinates();
  const latitude = coordinates.coordinates.latitude;
  const longitude = coordinates.coordinates.longitude;
  return [latitude, longitude];
}

const containerStyle = {
  width: "100%",
  height: "30vh",
};

function Map({ restaurantLatitude, restaurantLongitude }) {
  const [map, setMap] = React.useState(null);

  const mapOptions = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: false,
    streetViewControl: false,
  };

  const [userCoordinates, setUserCoordinates] = useState([]);

  React.useEffect(() => {
    if (!map) return;
    map.setCenter({ lat: restaurantLatitude, lng: restaurantLongitude });
    getCoordinates().then((res) => setUserCoordinates(res));
  }, [map, restaurantLatitude, restaurantLongitude]);

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
        latitude={userCoordinates[0]}
        longitude={userCoordinates[1]}
      />
    </GoogleMap>
  );
}

export default React.memo(Map);
