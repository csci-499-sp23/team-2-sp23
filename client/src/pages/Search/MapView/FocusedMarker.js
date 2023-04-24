/*global google*/
import React from "react";
import { MarkerF } from "@react-google-maps/api";
const AmongusVent = require("../../../assets/images/among-us-vent.png");

export default function FocusedMarker({ selectedRestaurant, updateFields }) {
  if (!selectedRestaurant) return <></>;

  const { restaurant } = selectedRestaurant;
  const coordinates = restaurant.location.coordinates;
  const [longitude, latitude] = coordinates;

  return (
    <MarkerF
      position={{
        lng: longitude,
        lat: latitude,
      }}
      icon={{
        url: AmongusVent,
        scaledSize: new google.maps.Size(50, 36),
      }}
      onDragEnd={(event) => {
        const updatedLatitude = event.latLng.lat();
        const updatedLongitude = event.latLng.lng();
        updateFields({
          longitude: updatedLongitude,
          latitude: updatedLatitude,
        });
      }}
    />
  );
}
