import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { login, logout } from "../store/reducers/user";
import { useDispatch } from "react-redux";

export default function AuthenticateButton() {
  const dispatch = useDispatch();
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
        username: Auth0User.name,
        profile_picture_url: Auth0User.picture,
        saved_restaurants: [],
      };

      dispatch(login(formattedUser));
    }
    // eslint-disable-next-line
  }, [Auth0User]);

  return isAuthenticated ? (
    <Button onClick={() => Auth0Logout()}>Logout</Button>
  ) : (
    <Button onClick={() => Auth0Login()}>Login</Button>
  );
}
