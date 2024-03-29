/*global google*/
import { MarkerF } from "@react-google-maps/api";
const AmongusVent = require("../../../../assets/images/among-us-vent.png");

export default function FocusedMarker({ selectedRestaurant }) {
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
    />
  );
}
