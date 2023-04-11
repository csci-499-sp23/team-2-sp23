import FoodCard from "../../../components/FoodCard";

const classes = {
  foodList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
};

function FoodList({ foods }) {
  return (
    <div style={classes.foodList}>
      {foods.map((food, i) => (
        <FoodCard
          key={i}
          name={food.name}
          price={food.price}
          description={food.description}
          imageUrl={food.image_url}
        />
      ))}
    </div>
  );
}

export default FoodList;
