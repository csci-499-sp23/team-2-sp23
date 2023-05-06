import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { login, logout } from "../../store/reducers/user";
import { useDispatch } from "react-redux";

const classes = {
  profileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    color: "white",
    fontSize: "1rem",
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
    <div style={classes.profileContainer}>
      <Avatar
        src={user.profile_picture_url}
        sx={{ height: "32px", width: "32px", border: "1px solid white" }}
      />
      {user.username}
      <IconButton sx={{ color: "white" }} onClick={() => Auth0Logout()}>
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

  useEffect(() => {
    if (!isAuthenticated) dispatch(logout());
    else {
      const formattedUser = {
        _id: null,
        auth0_id: Auth0User.sub,
        username: Auth0User.nickname,
        profile_picture_url: Auth0User.picture,
        saved_restaurants: [],
      };

      dispatch(login(formattedUser));
    }
    // eslint-disable-next-line
  }, [Auth0User]);

  return user.logged_in ? (
    <LoggedInProfile Auth0Logout={Auth0Logout} />
  ) : (
    <LoggedOutProfile Auth0Login={Auth0Login} />
  );
}
