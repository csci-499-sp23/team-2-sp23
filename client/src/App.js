import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        The quick brown fox jumped over the lazy dog
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
