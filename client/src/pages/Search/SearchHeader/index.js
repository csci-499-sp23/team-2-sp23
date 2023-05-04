import React from "react";
import SearchField from "./SearchField";
import SortQuery from "./SortQuery";
import { Box } from "@mui/material";
import RestaurantFilters from "./RestaurantFilter";
import PageNavigation from "./PageNavigation";
import ViewToggler from "./ViewToggler";

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
  priceFilter,
  setPriceFilter,
  foodCategories,
  setFoodCategories,
  viewMode,
  setViewMode,
  pageNavigationProps,
}) {
  return (
    <div style={classes.headerContainer}>
      <SearchField searchFields={searchFields} updateFields={updateFields} />
      <SortQuery searchFields={searchFields} updateFields={updateFields} />
      <RestaurantFilters
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        foodCategories={foodCategories}
        setFoodCategories={setFoodCategories}
      />
      <Box sx={classes.separator} />
      <ViewToggler viewMode={viewMode} setViewMode={setViewMode} />
      <PageNavigation {...pageNavigationProps} />
    </div>
  );
}
