import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import getLocation from "./utils/getLocation";

function App() {
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    getLocation().then((coordinates) => {
      setCoordinates(coordinates);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route
            path="/search"
            element={<Search coordinates={coordinates} />}
          />
          <Route path="/" element={<Search coordinates={coordinates} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
