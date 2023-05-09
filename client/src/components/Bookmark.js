import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSelector } from "react-redux";

const classes = {
  bookmark: {
    position: "absolute",
    top: 0,
    right: "-2px",
    color: "#91D4FA",
    padding: 0,
  },
};

function SavedBookmark({ style }) {
  return (
    <IconButton style={classes.bookmark}>
      <BookmarkIcon style={style} />
    </IconButton>
  );
}

function UnsavedBookmark({ style }) {
  return (
    <IconButton style={classes.bookmark}>
      <BookmarkBorderIcon style={style} />
    </IconButton>
  );
}

export default function Bookmark({ style, restaurantId }) {
  const user = useSelector((state) => state.user);
  return user.saved_restaurants.includes(restaurantId) ? (
    <SavedBookmark style={style} restaurantId={restaurantId} />
  ) : (
    <UnsavedBookmark style={style} restaurantId={restaurantId} />
  );
}
