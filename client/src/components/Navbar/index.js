import React from "react";
import githubLogo from "../../assets/images/github-logo.png";
import logo from "../../assets/images/logo.png";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-content">
        <div>
          <img src={logo} className="github-logo" alt="github-logo" />
        </div>
        <div>Home</div>
        <div>Search</div>
        <div>Saved</div>
        <div className="right-logo">
          <img src={githubLogo} className="github-logo" alt="github-logo" />
        </div>
      </div>
    </nav>
  );
}
