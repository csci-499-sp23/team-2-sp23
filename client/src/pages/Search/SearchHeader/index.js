import React from "react";
import SearchField from "./SearchField";
import ViewToggler from "./ViewToggler";
import { Box } from "@mui/material";
import PageNavigation from "./PageNavigation";

const classes = {
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "0.25rem",
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
  pageNavigationProps,
}) {
  return (
    <div style={classes.headerContainer}>
      <SearchField updateFields={updateFields} searchFields={searchFields} />
      <Box sx={classes.separator} />
      <ViewToggler viewMode={viewMode} setViewMode={setViewMode} />
      <PageNavigation {...pageNavigationProps} />
    </div>
  );
}
