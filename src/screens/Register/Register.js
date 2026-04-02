import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <main className="register-screen">
      <section className="register-card">
        <h1>Crear cuenta</h1>
        <p>Completá el formulario para registrarte en Blockbuster.</p>

        <form className="register-form">
          <label htmlFor="name">Nombre</label>
          <input id="name" type="text" placeholder="Tu nombre" />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="tuemail@mail.com" />

          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="********" />

          <label htmlFor="repeatPassword">Repetir contraseña</label>
          <input id="repeatPassword" type="password" placeholder="********" />

          <button type="submit">Registrarme</button>
        </form>
      </section>
    </main>
  );
};

export default Register;
