import React from "react";
import RestaurantCard from "../GridView/RestaurantCard";
import StarIcon from "@mui/icons-material/Star";

const classes = {
  container: {
    margin: "0.75rem",
    marginInline: "0.5rem",
  },
  foodContainer: {
    width: "100%",
    height: "fit-content",
    overflowX: "auto",
    overflowY: "hidden",
    display: "flex",
    gap: "1rem",
  },
};

export default function Recommendations({ rows, setModalFoods, openModal }) {
  if (!rows || !rows.length) return <></>;

  return (
    <div style={classes.container}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <StarIcon style={{ color: "#FFBA00" }} />
        <span>Recommended near you</span>
      </div>
      <div style={classes.foodContainer}>
        {rows.map((row) => (
          <RestaurantCard
            {...row}
            key={`${row.restaurant._id}-recommended`}
            style={{ border: "2px solid #FFBA00" }}
            setModalFoods={setModalFoods}
            openModal={openModal}
          />
        ))}
      </div>
    </div>
  );
}
