import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";

const classes = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pageArrow: { color: "primary.main", padding: "0.25rem" },
};

export default function PageNavigation({
  count_limit,
  total_count,
  page_number,
  updatePage,
}) {
  if (!total_count) return <div>No restaurants found...</div>;

  const lowerBound = 1 + page_number * count_limit;
  const upperBound = Math.min((page_number + 1) * count_limit, total_count);

  return (
    <div style={classes.container}>
      <IconButton
        sx={classes.pageArrow}
        disabled={page_number === 0}
        onClick={() => {
          updatePage(page_number - 1);
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <div>
        Found {lowerBound}-{upperBound} of {total_count}
      </div>
      <IconButton
        sx={classes.pageArrow}
        disabled={upperBound === total_count}
        onClick={() => updatePage(page_number + 1)}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}
