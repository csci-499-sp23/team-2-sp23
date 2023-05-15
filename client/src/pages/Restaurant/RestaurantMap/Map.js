/*global google*/
import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "40vh",
};

function Map({ latitude, longitude }) {
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
    map.setCenter({ lat: latitude, lng: longitude });
  }, [map, latitude, longitude]);

  return (
    <GoogleMap
      state={map}
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        map.setZoom(16);
        map.setCenter({ lat: latitude, lng: longitude });
        setMap(map);
      }}
      onUnmount={() => setMap(null)}
      options={mapOptions}
    >
    </GoogleMap>
  );
}

export default React.memo(Map);
