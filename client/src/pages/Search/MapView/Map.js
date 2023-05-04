/*global google*/
import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import MapCircle from "./MapItems/MapCircle";
import MapAvatar from "./MapItems/MapAvatar";
import RestaurantMarkers from "./MapItems/RestaurantMarkers";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

function Map({
  longitude,
  latitude,
  rows,
  updateFields,
  showRestaurant,
  searchRadius,
}) {
  const [map, setMap] = React.useState(null);

  const mapOptions = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: false,
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
      <MapCircle
        longitude={longitude}
        latitude={latitude}
        searchRadius={searchRadius}
      />
      <MapAvatar
        longitude={longitude}
        latitude={latitude}
        updateFields={updateFields}
        setMapCenter={(position) => map.setCenter(position)}
        onDragEnd={(event) => {
          const updatedLatitude = event.latLng.lat();
          const updatedLongitude = event.latLng.lng();
          updateFields({
            longitude: updatedLongitude,
            latitude: updatedLatitude,
          });
          map.setCenter({ lat: updatedLatitude, lng: updatedLongitude });
        }}
      />
      <RestaurantMarkers
        rows={rows}
        showRestaurant={showRestaurant}
        setMapCenter={(position) => map.setCenter(position)}
      />
    </GoogleMap>
  );
}

export default React.memo(Map);
