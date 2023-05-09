function FoodCard({ name, price, description, imageUrl }) {
  const classes = {
    cardContainer: {
      boxSizing: "border-box",
      width: "100%",
      border: "2px solid #5a5a5a",
      padding: "0.25rem",
      display: "flex",
      gap: "0.25rem",
      backgroundColor: "hsl(35,0%,97%)",
    },
    foodPrice: {
      fontSize: "1rem",
      marginLeft: "auto",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    foodDescription: {
      fontSize: "0.75rem",
      color: "#3A3A3A",
      overflow: "auto",
      whiteSpace: "normal",
      maxHeight: "72px",
      borderLeft: "2px solid",
      borderColor: "hsl(30,80%,40%)",
      paddingLeft: "0.25rem",
    },
    image: {
      minWidth: "52px",
      width: "52px",
      height: "52px",
      objectFit: "cover",
      borderRadius: "2px",
    },
  };

  return (
    <div style={classes.cardContainer}>
      {imageUrl && <img src={imageUrl} style={classes.image} alt="Food Item" />}
      <div>
        <div>{name}</div>
        <div style={classes.foodDescription}>{description}</div>
      </div>
      <div style={classes.foodPrice}>${price.toFixed(2)}</div>
    </div>
  );
}

export default FoodCard;
