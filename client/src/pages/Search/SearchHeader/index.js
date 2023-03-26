import React from "react";
import SearchField from "./SearchField";

export default function SearchHeader({ retrieveRestaurants, initialSearch }) {
  return (
    <div>
      <SearchField
        retrieveRestaurants={retrieveRestaurants}
        initialSearch={initialSearch}
      />
    </div>
  );
}
