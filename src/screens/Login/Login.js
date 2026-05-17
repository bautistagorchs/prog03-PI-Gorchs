import React, { useEffect, useState } from "react";
import "./Login.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      props.history.push("/");
    }
  }, [props]);

  const updateValues = (e, field) => {
    if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));

    if (users !== null) {
      const userExists = users.filter((user) => user.email === email);

      if (userExists.length > 0) {
        const passwordsMatch = password === userExists[0].password;

        if (passwordsMatch) {
          cookies.set("loggedUser", email, { path: "/" });
          props.history.push("/");
        } else {
          alert("La contraseña es incorrecta");
        }
      } else {
        alert("No hay ningún usuario registrado con esa direccion de correo");
      }
    } else {
      alert("No hay usuarios registrados");
      props.history.push("/register");
    }
  };

  return (
    <main className="login-screen">
      <section className="login-card">
        <h1>Iniciar sesión</h1>
        <p>Ingresá tus datos para acceder a tu cuenta de Blockbuster.</p>

        <form className="login-form" onSubmit={(e) => submit(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@example.com"
            onChange={(e) => updateValues(e, "email")}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="***********"
            onChange={(e) => updateValues(e, "password")}
          />

          <button type="submit">Login</button>
        </form>
        <Link className="goToRegister" to="/register">
          No tienes una cuenta? Regístrate aquí
        </Link>
      </section>
    </main>
  );
}

export default Login;
