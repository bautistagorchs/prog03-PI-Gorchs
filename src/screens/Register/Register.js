import React, { useEffect, useState } from "react";
import "./Register.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      props.history.push("/");
    }
  }, [props]);

  const updateValues = (e, field) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    } else if (field === "repeatPassword") {
      setRepeatPassword(e.target.value);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

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
      const userExists = users.filter((user) => user.email === email);

      if (userExists.length > 0) {
        alert("Ya existe un usuario registrado con ese email.");
        return;
      }
    }
    const newUser = { email, name, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    props.history.push("/login");
  };

  return (
    <main className="register-screen">
      <section className="register-card">
        <h1>Crear cuenta</h1>
        <p>Completá el formulario para registrarte en Blockbuster.</p>

        <form className="register-form" onSubmit={(e) => submitForm(e)}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            onChange={(e) => updateValues(e, "name")}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="tuemail@mail.com"
            onChange={(e) => updateValues(e, "email")}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            onChange={(e) => updateValues(e, "password")}
          />

          <label htmlFor="repeatPassword">Repetir contraseña</label>
          <input
            id="repeatPassword"
            type="password"
            placeholder="********"
            onChange={(e) => updateValues(e, "repeatPassword")}
          />

          <button type="submit">Registrarme</button>
        </form>
        <Link className="goToLogin" to="/login">
          Ya tienes una cuenta? Inicia sesión aquí
        </Link>
      </section>
    </main>
  );
}

export default Register;
