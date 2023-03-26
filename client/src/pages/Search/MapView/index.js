import React from "react";
import Map from "./Map";

export default function MapView({ longitude, latitude, rows}) {
  return <Map longitude={longitude} latitude={latitude} rows={rows}/>;
}
