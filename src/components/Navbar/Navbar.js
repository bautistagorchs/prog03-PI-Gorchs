import React from "react";
import "./Navbar.css";
import logo from "./logo_nobg.png";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const loggedUser = cookies.get("loggedUser");

    if (loggedUser) {
      this.setState({ isLoggedIn: true });
    }
  }

  logout(e) {
    e.preventDefault();
    cookies.remove("loggedUser");
    this.setState({ isLoggedIn: false });
    this.props.history.push("/");
  }

  render() {
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
              <li style={{ display: this.state.isLoggedIn ? "block" : "none" }}>
                <Link to="/favourites">Favourites</Link>
              </li>
              <li style={{ display: this.state.isLoggedIn ? "none" : "block" }}>
                <Link to="/register">Register</Link>
              </li>
              <li style={{ display: this.state.isLoggedIn ? "none" : "block" }}>
                <Link to="/login">Login</Link>
              </li>
              <li
                style={{ display: this.state.isLoggedIn ? "block" : "none" }}
                onClick={(e) => this.logout(e)}
              >
                <button>Log out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
