import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { login, logout } from "../../store/reducers/user";
import { useDispatch } from "react-redux";
import UserAPI from "../../api/user-api";

const classes = {
  profileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    color: "white",
    fontSize: "1rem",
  },
  alignHorizontal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

function LoggedOutProfile({ Auth0Login }) {
  return (
    <Button style={classes.profileContainer} onClick={() => Auth0Login()}>
      Login
      <LoginIcon />
    </Button>
  );
}

function LoggedInProfile({ Auth0Logout }) {
  const user = useSelector((state) => state.user);
  return (
    <div style={classes.alignHorizontal}>
      <Button style={classes.profileContainer}>
        <Avatar
          src={user.profile_picture_url}
          sx={{ height: "32px", width: "32px", border: "1px solid white" }}
        />
        {user.username}
      </Button>
      <IconButton
        sx={{ color: "white" }}
        onClick={() =>
          Auth0Logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <LogoutIcon />
      </IconButton>
    </div>
  );
}

export default function NavbarProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    user: Auth0User,
    loginWithRedirect: Auth0Login,
    logout: Auth0Logout,
    isAuthenticated,
  } = useAuth0();

  // Run on auth0User change
  // On login, upserts a document for the user and stores the user as global state
  async function updateUserState() {
    if (!isAuthenticated) dispatch(logout());
    else {
      const auth0Id = Auth0User.sub;
      const loggedInUser = await UserAPI.createUser(auth0Id).catch(() => null);

      if (loggedInUser === null) {
        console.error("Could not log in");
        return;
      }

      const formattedUser = {
        _id: loggedInUser._id,
        auth0_id: loggedInUser.auth0_id,
        username: Auth0User.nickname,
        profile_picture_url: Auth0User.picture,
        saved_restaurants: loggedInUser.saved_restaurants,
      };

      dispatch(login(formattedUser));
    }
  }

  useEffect(() => {
    updateUserState();
    // eslint-disable-next-line
  }, [Auth0User]);

  return user.logged_in ? (
    <LoggedInProfile Auth0Logout={Auth0Logout} />
  ) : (
    <LoggedOutProfile Auth0Login={Auth0Login} />
  );
}
