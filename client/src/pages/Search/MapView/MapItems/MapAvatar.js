/*global google*/
import { MarkerF } from "@react-google-maps/api";
const AMONGUS = require("../../../../assets/images/among-us.webp");

// The draggable avatar for users to teleport on the map
export default function Avatar({
  longitude,
  latitude,
  updateFields,
  setMapCenter,
}) {
  return (
    <MarkerF
      position={{ lng: longitude, lat: latitude }}
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
        setMapCenter({ lat: updatedLatitude, lng: updatedLongitude });
      }}
    />
  );
}
