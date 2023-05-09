import defaultRestaurantImg from "../../../../assets/images/default-restaurant-img.png";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const classes = {
  imageCard: {
    width: "50px",
    height: "100%",
    objectFit: "cover",
  },
  bookmark: {
    position: "absolute",
    top: 0,
    right: "-2px",
    color: "#91D4FA",
    padding: 0,
  },
};

function ImageCard({ src, restaurantId }) {
  const user = useSelector((state) => state.user);
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

      {user.saved_restaurants.includes(restaurantId) ? (
        <IconButton style={classes.bookmark}>
          <BookmarkIcon />
        </IconButton>
      ) : (
        <IconButton style={classes.bookmark}>
          <BookmarkBorderIcon />
        </IconButton>
      )}
    </div>
  );
}

export default ImageCard;
