import { IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function PriceSortButton({ handleSortChange, sortDirection }) {
  return (
    <IconButton
      color="primary"
      sx={{
        border: 1,
        marginTop: "1rem",
        height: "fit-content",
        padding: "0.25rem",
      }}
      onClick={handleSortChange}
    >
      {sortDirection === 1 ? (
        <ArrowDownwardIcon sx={{ fontSize: "1.25rem" }} />
      ) : (
        <ArrowUpwardIcon sx={{ fontSize: "1.25rem" }} />
      )}
    </IconButton>
  );
}

export default PriceSortButton;
