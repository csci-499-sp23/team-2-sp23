/*global google*/
import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import RestaurantMarker from "./RestaurantMarker";
import UserMarker from "./UserMarker";
import getUserCoordinates from "../../../utils/getUserCoordinates";

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
    if (!map) return;
    updateUserCoordinates();
  }, [map]);

  React.useEffect(() => {
    if (!map) return;
    if (renderedMarkerCount > 1) setMapCenterToMarkers(map);
    else setMapCenterToRestaurant(map);
    // eslint-disable-next-line
  }, [map, userCoordinates]);

  const markers = [restaurantCoordinates, userCoordinates];
  const renderedMarkerCount = markers.filter((marker) => !!marker).length;

  function setMapCenterToMarkers(map) {
    const mapBounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
      if (!marker) return;
      mapBounds.extend({
        lat: marker.latitude,
        lng: marker.longitude,
      });
    });
    map.fitBounds(mapBounds);
  }

  function setMapCenterToRestaurant(map) {
    map.setZoom(16);
    map.setCenter({
      lat: restaurantLatitude,
      lng: restaurantLongitude,
    });
  }

  return (
    <GoogleMap
      state={map}
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
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
