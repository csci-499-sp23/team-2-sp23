import { useState } from "react";
import { Modal } from "@mui/material";
import FoodCard from "../components/FoodCard";

const classes = {
  modalContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "70vh",
    backgroundColor: "rgba(69,69,69,0.69)",
    width: "calc(min(100%,var(--content-width)) - 2rem)",
    overflowY: "auto",
    boxSizing: "border-box",
    paddingInline: "1rem",
  },
  foodList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

export default function useMenuModal() {
  const [open, setOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  function MenuModal() {
    return (
      <Modal open={open} onClose={closeModal}>
        <div style={classes.modalContainer}>
          <div style={classes.foodList}>
            {foods.map((food, idx) => (
              <FoodCard
                key={idx}
                name={food.name}
                price={food.price}
                description={food.description}
                imageUrl={food.image_url}
              />
            ))}
          </div>
        </div>
      </Modal>
    );
  }

  return {
    openModal,
    setFoods,
    MenuModal,
  };
}
