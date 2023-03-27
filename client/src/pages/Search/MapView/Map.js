/*global google*/
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "80vh",
};

function Map({ longitude, latitude, rows, updateFields }) {
  const center = {
    lat: latitude,
    lng: longitude,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(16);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const AMONGUS = require("../../../assets/images/among-us.webp");

  return isLoaded ? (
    <GoogleMap
      state={map}
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{
          lng: longitude,
          lat: latitude,
        }}
        icon={{
          url: AMONGUS,
          scaledSize: new google.maps.Size(40, 48),
        }}
        draggable={true}
        onDragEnd={(event) => {
          const updatedLatitude = event.latLng.lat();
          const updatedLongitude = event.latLng.lng();
          updateFields({
            longitude: updatedLongitude,
            latitude: updatedLatitude,
          });
        }}
      />
      {rows.map((row) => {
        const { restaurant } = row;
        const coordinates = restaurant.location.coordinates;
        const [longitude, latitude] = coordinates;
        return (
          <Marker
            key={restaurant.yelp_id}
            position={{
              lng: longitude,
              lat: latitude,
            }}
          />
        );
      })}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
