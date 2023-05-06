import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import AuthenticateButton from "./components/AuthenticateButton";

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <AuthenticateButton />
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
