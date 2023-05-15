import Navbar from "./components/Navbar";
import Profile from "./pages/ProfilePage";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import SnackbarAlert from "./components/SnackbarAlert";
import { useJsApiLoader } from "@react-google-maps/api";
import { SEARCH_LOCATION_TYPES } from "./pages/Search/constants";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: SEARCH_LOCATION_TYPES,
  });

  return (
    <>
      <SnackbarAlert />
      <Navbar />
      <div className="page-container">
        {isLoaded && (
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Search />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
