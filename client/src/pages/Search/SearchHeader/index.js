import React from "react";
import SearchField from "./SearchField";
import ViewToggler from "./ViewToggler";
import { Box } from "@mui/material";

const classes = {
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  separator: {
    backgroundColor: "primary.main",
    width: "95%",
    height: "2px",
    alignSelf: "center",
  },
};

export default function SearchHeader({
  retrieveRestaurants,
  initialSearch,
  viewMode,
  setViewMode,
}) {
  return (
    <div style={classes.headerContainer}>
      <SearchField
        retrieveRestaurants={retrieveRestaurants}
        initialSearch={initialSearch}
      />
      <Box sx={classes.separator} />
      <ViewToggler viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
