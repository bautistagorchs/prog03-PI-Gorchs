import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <main className="login-screen">
      <section className="login-card">
        <h1>Iniciar sesión</h1>
        <p>Ingresá tus datos para acceder a tu cuenta de Blockbuster.</p>

        <form action="" className="login-form">
          <label htmlFor="username">Username</label>
          <input type="email" id="username" placeholder="email@example.com" />
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" id="contraseña" placeholder="***********" />

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
