/*global google*/
import { MarkerF } from "@react-google-maps/api";

const AMONGUS = require("../../../assets/images/among-us.webp");

export default function UserMarker({ latitude, longitude }) {
  return (
    <MarkerF
      position={{ lng: longitude, lat: latitude }}
      icon={{
        url: AMONGUS,
        scaledSize: new google.maps.Size(40, 48),
      }}
    />
  );
}
