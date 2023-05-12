import defaultRestaurantImg from "../../../../assets/images/default-restaurant-img.png";
import Bookmark from "../../../../components/Bookmark";

const classes = {
  imageCard: {
    width: "50px",
    height: "100%",
    objectFit: "cover",
  },
};

function ImageCard({ src, restaurantId, restaurantName }) {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={src || defaultRestaurantImg}
        style={classes.imageCard}
        alt={"restaurant"}
        onError={(e) => {
          e.currentTarget.src = defaultRestaurantImg;
        }}
      />
      <Bookmark restaurantId={restaurantId} restaurantName={restaurantName} />
    </div>
  );
}

export default ImageCard;
