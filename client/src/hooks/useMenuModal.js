import { useState } from "react";
import { Modal } from "@mui/material";

const classes = {
  modalContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "70vh",
    width: "min(100%,var(--content-width))",
    backgroundColor: "black",
    color: "white",
  },
};

export default function useMenuModal() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  function MenuModal() {
    return (
      <Modal open={open} onClose={closeModal}>
        <div style={classes.modalContainer}>hi</div>
      </Modal>
    );
  }

  return {
    openModal,
    MenuModal,
  };
}
