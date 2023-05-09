import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { updateSaved } from "../store/reducers/user";
import UserAPI from "../api/user-api";

const classes = {
  bookmark: {
    position: "absolute",
    top: 0,
    right: "-2px",
    color: "#91D4FA",
    padding: 0,
  },
};

function SavedBookmark({ style, unsaveRestaurant }) {
  return (
    <IconButton style={classes.bookmark} onClick={() => unsaveRestaurant()}>
      <BookmarkIcon style={style} />
    </IconButton>
  );
}

function UnsavedBookmark({ style, saveRestaurant }) {
  return (
    <IconButton style={classes.bookmark} onClick={() => saveRestaurant()}>
      <BookmarkBorderIcon style={style} />
    </IconButton>
  );
}

export default function Bookmark({ style, restaurantId }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function saveRestaurant() {
    const updatedUser = await UserAPI.saveRestaurant(
      user._id,
      restaurantId
    ).catch(() => {
      console.error("Could not save restaurant");
      return null;
    });

    if (updatedUser !== null) {
      dispatch(updateSaved(updatedUser));
    }
  }

  async function unsaveRestaurant() {
    const updatedUser = await UserAPI.unsaveRestaurant(
      user._id,
      restaurantId
    ).catch(() => {
      console.error("Could not unsave restaurant");
      return null;
    });

    if (updatedUser !== null) {
      dispatch(updateSaved(updatedUser));
    }
  }

  return user.saved_restaurants.includes(restaurantId) ? (
    <SavedBookmark style={style} unsaveRestaurant={unsaveRestaurant} />
  ) : (
    <UnsavedBookmark style={style} saveRestaurant={saveRestaurant} />
  );
}
