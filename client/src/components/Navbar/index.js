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
          <a
            href="https://github.com/csci-499-sp23/team-2-sp23"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubLogo} className="github-logo" alt="github-logo" />
          </a>
        </div>
      </div>
    </nav>
  );
}
