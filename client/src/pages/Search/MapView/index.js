import React from "react";
import Map from "./Map";

export default function MapView({ longitude, latitude }) {
  return <Map longitude={longitude} latitude={latitude} />;
}
