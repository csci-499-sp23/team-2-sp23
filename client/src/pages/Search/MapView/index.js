import React from "react";
import Map from "./Map";

export default function MapView({ longitude, latitude, rows, updateFields }) {
  return (
    <Map
      longitude={longitude}
      latitude={latitude}
      rows={rows}
      updateFields={updateFields}
    />
  );
}
