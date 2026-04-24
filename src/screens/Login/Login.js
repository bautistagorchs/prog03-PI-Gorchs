import React, { Component } from "react";
import "./Login.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    const loggedUser = cookies.get("loggedUser");

    if (loggedUser) {
      this.props.history.push("/");
    }
  }

  updateValues(e, field) {
    this.setState({ [field]: e.target.value });
  }

  submit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));

    if (users !== null) {
      // users existe
      const userExists = users.filter((user) => user.email === email);

      if (userExists.length > 0) {
        const passwordsMatch = password === userExists[0].password;

        if (passwordsMatch) {
          cookies.set("loggedUser", email);
          this.props.history.push("/");
        } else return alert("La contraseña es incorrecta");
      } else {
        alert("No hay ningún usuario registrado con esa direccion de correo ");
      }
    } else {
      alert("No hay usuarios registrados");
      this.props.history.push("/register");
    }
  }

  render() {
    return (
      <main className="login-screen">
        <section className="login-card">
          <h1>Iniciar sesión</h1>
          <p>Ingresá tus datos para acceder a tu cuenta de Blockbuster.</p>

          <form className="login-form" onSubmit={(e) => this.submit(e)}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              onChange={(e) => this.updateValues(e, "email")}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="***********"
              onChange={(e) => this.updateValues(e, "password")}
            />

            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    );
  }
}
export default Login;
