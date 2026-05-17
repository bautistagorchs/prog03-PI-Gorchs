import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./logo_nobg.png";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    cookies.remove("loggedUser", { path: "/" });
    setIsLoggedIn(false);
    props.history.push("/");
  };

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
            <li style={{ display: isLoggedIn ? "block" : "none" }}>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li style={{ display: isLoggedIn ? "none" : "block" }}>
              <Link to="/register">Register</Link>
            </li>
            <li style={{ display: isLoggedIn ? "none" : "block" }}>
              <Link to="/login">Login</Link>
            </li>
            <li
              style={{ display: isLoggedIn ? "block" : "none" }}
              onClick={logout}
            >
              <button>Log out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
