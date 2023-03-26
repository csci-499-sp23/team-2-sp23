import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

function Map({ longitude, latitude, rows }) {
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

  return isLoaded ? (
    <GoogleMap
      state={map}
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={{ lng: longitude, lat: latitude }} />
      {rows.map((row) => {
        const { restaurant } = row;
        const coordinates = restaurant.location.coordinates;
        const [longitude, latitude] = coordinates;
        return (
          <Marker
            key={row.restaurant.yelp_id}
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
