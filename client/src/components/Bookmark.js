import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { updateSaved } from "../store/reducers/user";
import UserAPI from "../api/user-api";
import { alertSnackbar } from "../store/reducers/snackbar";

const classes = {
  bookmark: {
    position: "absolute",
    top: 0,
    right: "-2px",
    color: "#91D4FA",
    padding: 0,
  },
};

function SavedBookmark({ style, iconStyle, unsaveRestaurant }) {
  return (
    <IconButton
      style={{ ...classes.bookmark, ...iconStyle }}
      onClick={() => unsaveRestaurant()}
    >
      <BookmarkIcon style={style} />
    </IconButton>
  );
}

function UnsavedBookmark({ style, iconStyle, saveRestaurant }) {
  return (
    <IconButton
      style={{ ...classes.bookmark, ...iconStyle }}
      onClick={() => saveRestaurant()}
    >
      <BookmarkBorderIcon style={style} />
    </IconButton>
  );
}

export default function Bookmark({
  style,
  iconStyle,
  restaurantId,
  restaurantName,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function assertUserLoggedin() {
    if (user.logged_in) return true;
    dispatch(
      alertSnackbar({
        message: "You must be logged in to save restaurants",
        severity: "warning",
      })
    );

    return false;
  }

  function handleActionError() {
    dispatch(
      alertSnackbar({
        message: `Could not save ${restaurantName}`,
        severity: "error",
      })
    );
  }

  async function saveRestaurant() {
    if (!assertUserLoggedin()) return;
    const updatedUser = await UserAPI.saveRestaurant(
      user._id,
      restaurantId
    ).catch(() => {
      handleActionError();
      return null;
    });

    if (updatedUser !== null) {
      dispatch(updateSaved(updatedUser));
      dispatch(
        alertSnackbar({
          message: `Saved: ${restaurantName}`,
          severity: "success",
        })
      );
    }
  }

  async function unsaveRestaurant() {
    if (!assertUserLoggedin()) return;
    const updatedUser = await UserAPI.unsaveRestaurant(
      user._id,
      restaurantId
    ).catch(() => {
      handleActionError();
      return null;
    });

    if (updatedUser !== null) {
      dispatch(updateSaved(updatedUser));
      dispatch(
        alertSnackbar({
          message: `Removed: ${restaurantName}`,
          severity: "success",
        })
      );
    }
  }

  return user.saved_restaurants.includes(restaurantId) ? (
    <SavedBookmark
      style={style}
      iconStyle={iconStyle}
      unsaveRestaurant={unsaveRestaurant}
    />
  ) : (
    <UnsavedBookmark
      style={style}
      iconStyle={iconStyle}
      saveRestaurant={saveRestaurant}
    />
  );
}
