import React, { Component } from "react";
import "./Register.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
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
  submitForm(e) {
    e.preventDefault();

    const { name, email, password, repeatPassword } = this.state;

    if (!name || !email || !password || !repeatPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users !== null) {
      // users existe
      const userExists = users.filter((user) => user.email === email);

      if (userExists.length > 0)
        return alert("Ya existe un usuario registrado con ese email.");
    }
    const newUser = { email, name, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    this.props.history.push("/login");
  }
  render() {
    return (
      <main className="register-screen">
        <section className="register-card">
          <h1>Crear cuenta</h1>
          <p>Completá el formulario para registrarte en Blockbuster.</p>

          <form className="register-form" onSubmit={(e) => this.submitForm(e)}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              onChange={(e) => this.updateValues(e, "name")}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tuemail@mail.com"
              onChange={(e) => this.updateValues(e, "email")}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => this.updateValues(e, "password")}
            />

            <label htmlFor="repeatPassword">Repetir contraseña</label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="********"
              onChange={(e) => this.updateValues(e, "repeatPassword")}
            />

            <button type="submit">Registrarme</button>
          </form>
        </section>
      </main>
    );
  }
}

export default Register;
