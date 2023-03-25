import RestaurantCard from "./RestaurantCard";

const classes = {
  restaurantList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
};

function CardView({ coordinates, rows }) {
  return (
    <div style={classes.restaurantList}>
      {rows.map((row) => (
        <RestaurantCard
          key={row.restaurant.yelp_id}
          restaurant={row.restaurant}
          foods={row.foods}
        />
      ))}
    </div>
  );
}

export default CardView