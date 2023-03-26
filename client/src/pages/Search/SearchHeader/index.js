import React from "react";
import SearchField from "./SearchField";
import ViewToggler from "./ViewToggler";

export default function SearchHeader({
  retrieveRestaurants,
  initialSearch,
  viewMode,
  setViewMode,
}) {
  return (
    <div>
      <SearchField
        retrieveRestaurants={retrieveRestaurants}
        initialSearch={initialSearch}
      />
      <ViewToggler viewMode={viewMode} setViewMode={setViewMode}></ViewToggler>
    </div>
  );
}
