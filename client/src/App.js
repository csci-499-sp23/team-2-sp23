import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";

function App() {
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
