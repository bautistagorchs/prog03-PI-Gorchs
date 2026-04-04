import React from "react";
import "./Navbar.css";
import logo from "./logo_nobg.png";

const Navbar = () => {
  return (
    <nav>
      <div className="content-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo Blockbuster " />
          </a>
        </div>
        <div className="links-container">
          <ul>
            <li>
              <a href="/movies">Home</a>
            </li>
            <li>
              <a href="/movies">Movies</a>
            </li>
            <li>
              <a href="/series">Series</a>
            </li>
            <li>
              <a href="/favoritos">Favoritos</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
          <form class="search-form" action="results.html" method="get">
            <input
              type="text"
              class=""
              name="searchData"
              placeholder="Buscar..."
              value=""
            />
            <button type="submit" class="search-button">
              🔎
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
