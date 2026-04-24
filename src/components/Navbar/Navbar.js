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

  // no me funcionaba el boton de log out desde favoritos y resultados de busqueda, sin entender por que
  // busqué y encontre que a las cookies se les setea tambien un path, y que si no se lo seteas, por algun motivo, desde algunas screens, no se borra la cookie al hacer logout, por eso el boton de log out no funcionaba en esas pantallas
  // entonces lo agregue. se que no lo vimos en clase, no se si otros grupos tenían el mismo problema que yo, o si lo resolvieron distinto, o no lo resolvieron, pero no quería dejar de hacer un comentario al respecto.
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const loggedUser = cookies.get("loggedUser");
      this.setState({ isLoggedIn: !!loggedUser });
    }
  }

  logout(e) {
    e.preventDefault();
    // comentario sobre path en cookies en la linea 26
    cookies.remove("loggedUser", { path: "/" });
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
