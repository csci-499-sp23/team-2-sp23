/*global google*/
import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import RestaurantMarker from "./RestaurantMarker";

const containerStyle = {
  width: "100%",
  height: "40vh",
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

  React.useEffect(() => {
    if (!map) return;
    map.setCenter({ lat: restaurantLatitude, lng: restaurantLongitude });
  }, [map, restaurantLatitude, restaurantLongitude]);

  return (
    <GoogleMap
      state={map}
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        map.setZoom(16);
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
    </GoogleMap>
  );
}

export default React.memo(Map);
