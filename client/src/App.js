import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Restaurant from "./pages/Restaurant";
import RestaurantAPI from "./api/restaurant-api";
import { useDispatch } from "react-redux";
import { setFoodCategory } from "./store/reducers/foodCategories";

function App() {
  const dispatch = useDispatch();

  async function loadFoodCategories() {
    const retrievedFoodCategories =
      await RestaurantAPI.getRestaurantFoodCategories().catch(() => {
        console.error("Failed to retrieve food categories");
        return [];
      });

    dispatch(setFoodCategory(retrievedFoodCategories));
  }

  useEffect(() => {
    loadFoodCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
