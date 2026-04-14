import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-screen">
      <section className="not-found-card">
        <span className="not-found-badge">404</span>
        <h1>Contenido inexistente</h1>
        <p>
          La URL que ingresaste no existe dentro de Blockbuster. Volvé al inicio
          para seguir navegando el catálogo.
        </p>
        <Link to="/" className="not-found-link">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
