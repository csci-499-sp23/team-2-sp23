import { CircleF } from "@react-google-maps/api";

export default function MapCircle({ longitude, latitude, searchRadius }) {
  const circleOptions = {
    radius: searchRadius,
    fillColor: "hsla(25,80%,60%,60%)",
    strokeColor: "hsla(25,80%,60%,90%)",
    center: { lng: longitude, lat: latitude },
  };

  return <CircleF options={circleOptions} />
}
