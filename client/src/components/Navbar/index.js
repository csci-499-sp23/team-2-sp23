import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import githubLogo from "../../assets/images/github-logo.png";
import logo from "../../assets/images/logo-white.png";
import "./navbar.css";
import { LinearProgress } from "@mui/material";

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
          <Link style={linkStyle} to="/restaurant">
            Restaurant
          </Link>
          <div className="right-logo">
            <a
              href="https://github.com/csci-499-sp23/team-2-sp23"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubLogo}
                className="logo"
                alt="github-logo"
                style={{ paddingRight: "0.75rem" }}
              />
            </a>
          </div>
        </div>
      </div>
      {!progress.finishedLoading && <LinearProgress />}
    </nav>
  );
}
