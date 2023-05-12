import Navbar from "./components/Navbar";
import Profile from "./pages/ProfilePage";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import SnackbarAlert from "./components/SnackbarAlert";

function App() {
  return (
    <>
      <SnackbarAlert />
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
