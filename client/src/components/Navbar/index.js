import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-white.png";
import "./navbar.css";
import { LinearProgress } from "@mui/material";
import NavbarProfile from "./NavbarProfile";

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export default function Navbar() {
  const progress = useSelector((state) => state.progress);
  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar-content">
          <img
            src={logo}
            className="logo"
            alt="logo"
            style={{ paddingLeft: "0.75rem" }}
          />
          <Link style={linkStyle} to="/search">
            Search
          </Link>
          <div className="right-logo">
            <NavbarProfile />
          </div>
        </div>
      </div>
      {!progress.finishedLoading && <LinearProgress />}
    </nav>
  );
}
