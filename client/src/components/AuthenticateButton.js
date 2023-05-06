import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export default function AuthenticateButton() {
  const {
    loginWithRedirect: Auth0Login,
    logout: Auth0Logout,
    isAuthenticated,
  } = useAuth0();
  
  return isAuthenticated ? (
    <Button onClick={() => Auth0Logout()}>Logout</Button>
  ) : (
    <Button onClick={() => Auth0Login()}>Login</Button>
  );
}
