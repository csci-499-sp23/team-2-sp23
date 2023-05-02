import { Button } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

export default function ViewToggler({ viewMode, setViewMode }) {
  const classes = {
    toggleContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "0.69rem",
    },
    notSelected: {
      color: "grey",
    },
  };

  return (
    <div style={classes.toggleContainer}>
      <Button
        onClick={() => {
          setViewMode("map");
          localStorage.setItem("view-mode", "map");
        }}
        variant="outlined"
        startIcon={<LocationOnIcon />}
        style={viewMode !== "map" ? classes.notSelected : {}}
      >
        Map
      </Button>
      <Button
        onClick={() => {
          setViewMode("grid");
          localStorage.setItem("view-mode", "grid");
        }}
        variant="outlined"
        startIcon={<ViewModuleIcon />}
        style={viewMode !== "grid" ? classes.notSelected : {}}
      >
        Grid
      </Button>
    </div>
  );
}
