import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const sortKeys = [
  { label: "Distance", value: "distance" },
  { label: "Average Price", value: "avg_price" },
  { label: "Menu Items", value: "foods" },
  { label: "Reviews", value: "reviews" },
  { label: "Rating", value: "rating" },
];

const sortDirections = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export default function SortQuery({ updateFields, searchFields }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <FormControl variant="standard" sx={{ minWidth: 120, padding: 0 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={searchFields.sort_by} label="Sort By">
          {sortKeys.map((sortKey) => (
            <MenuItem
              key={sortKey.value}
              value={sortKey.value}
              onClick={() => updateFields({ sort_by: sortKey.value })}
            >
              {sortKey.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 120, padding: 0 }}>
        <InputLabel>Sort Direction</InputLabel>
        <Select value={searchFields.sort_dir} label="Sort Direction">
          {sortDirections.map((sortDirection) => (
            <MenuItem
              key={sortDirection.value}
              value={sortDirection.value}
              onClick={() => updateFields({ sort_dir: sortDirection.value })}
            >
              {sortDirection.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
