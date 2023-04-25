/*global google*/
import React from "react";
import { GoogleMap, MarkerF, CircleF } from "@react-google-maps/api";
import FocusedMarker from "./FocusedMarker";
const AMONGUS = require("../../../assets/images/among-us.webp");

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
  const startingCenter = {
    lat: latitude,
    lng: longitude,
  };

  const [map, setMap] = React.useState(null);
  const [circle, setCircle] = React.useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState(null);

  const mapOptions = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: false,
  };
  const circleOptions = {
    radius: searchRadius,
    fillColor: "hsla(25,80%,60%,60%)",
    strokeColor: "hsla(25,80%,60%,90%)",
    center: startingCenter,
  };

  const nonSelectedMarkers = rows.filter(
    (row) => row.restaurant.yelp_id !== selectedRestaurantId
  );
  const selectedRestaurant = rows.find(
    (row) => row.restaurant.yelp_id === selectedRestaurantId
  );

  return (
    <GoogleMap
      state={map}
      center={startingCenter}
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        map.setZoom(16);
        map.setCenter({ lat: latitude, lng: longitude });
        setMap(map);
      }}
      onUnmount={() => setMap(null)}
      options={mapOptions}
    >
      <CircleF
        onLoad={(circle) => setCircle(circle)}
        onUnmount={() => setCircle(null)}
        options={circleOptions}
        draggable
        onDragEnd={() => {
          const updatedLatitude = circle.center.lat();
          const updatedLongitude = circle.center.lng();

          updateFields({
            longitude: updatedLongitude,
            latitude: updatedLatitude,
          });
          map.setCenter({ lat: updatedLatitude, lng: updatedLongitude });
        }}
      />
      <MarkerF
        position={{
          lng: longitude,
          lat: latitude,
        }}
        icon={{
          url: AMONGUS,
          scaledSize: new google.maps.Size(40, 48),
        }}
        draggable
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
      <FocusedMarker
        selectedRestaurant={selectedRestaurant}
        updateFields={updateFields}
      />
      {nonSelectedMarkers.map((row) => {
        const { restaurant } = row;
        const coordinates = restaurant.location.coordinates;
        const [longitude, latitude] = coordinates;
        return (
          <MarkerF
            key={restaurant.yelp_id}
            position={{
              lng: longitude,
              lat: latitude,
            }}
            onClick={() => {
              showRestaurant(row);
              setSelectedRestaurantId(restaurant.yelp_id);
              map.setCenter({ lat: latitude, lng: longitude });
            }}
          />
        );
      })}
    </GoogleMap>
  );
}

export default React.memo(Map);
