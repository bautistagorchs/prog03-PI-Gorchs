import React from "react";
import "./Navbar.css";
import logo from "./logo_nobg.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="content-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo Blockbuster " />
          </a>
        </div>
        <div className="links-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/series">Series</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
