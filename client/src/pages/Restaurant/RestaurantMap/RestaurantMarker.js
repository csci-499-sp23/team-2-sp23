/*global google*/
import { MarkerF } from "@react-google-maps/api";
const AMONGUSVENT = require("../../../assets/images/among-us-vent.png");

export default function RestaurantMarker({ longitude, latitude }) {
  return (
    <MarkerF
      position={{ lng: longitude, lat: latitude }}
      icon={{
        url: AMONGUSVENT,
        scaledSize: new google.maps.Size(50, 36),
      }}
    />
  );
}
