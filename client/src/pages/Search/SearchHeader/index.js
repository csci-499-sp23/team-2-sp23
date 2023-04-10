import React from "react";
import SearchField from "./SearchField";
import ViewToggler from "./ViewToggler";
import { Box, Button } from "@mui/material";
import useMenuModal from "../../../hooks/useMenuModal";

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
  const { openModal, MenuModal } = useMenuModal();
  return (
    <div style={classes.headerContainer}>
      <Button onClick={openModal}>open Modal</Button>
      <MenuModal />
      <SearchField updateFields={updateFields} searchFields={searchFields} />
      <Box sx={classes.separator} />
      <ViewToggler viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
