import React from "react";
import SearchField from "./SearchField";
import ViewToggler from "./ViewToggler";
import PriceFilter from "../../../components/Filters/PriceFilter"
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
  updateFields,
  searchFields,
  viewMode,
  setViewMode,
}) {
  return (
    <div style={classes.headerContainer}>
      <SearchField updateFields={updateFields} searchFields={searchFields} />
      <PriceFilter />
      <Box sx={classes.separator} />
      <ViewToggler viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
