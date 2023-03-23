import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import RestaurantAPI from "./api/restaurant-api";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    RestaurantAPI.getNearbyRestaurants({
      longitude: -73.96452205115015,
      latitude: 40.76784067504097,
      meters: 50,
    }).then((res) => {
      console.log(res);
    });
  });
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
