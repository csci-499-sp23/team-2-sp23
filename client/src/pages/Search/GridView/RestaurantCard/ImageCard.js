import defaultRestaurantImg from "../../../../assets/images/default-restaurant-img.png";
const classes = {
  imageCard: {
    width: "50px",
    height: "100%",
    objectFit: "cover",
  },
};

function ImageCard({ src }) {
  return (
    <img
      src={src || defaultRestaurantImg}
      style={classes.imageCard}
      alt={"restaurant"}
    />
  );
}

export default ImageCard;
