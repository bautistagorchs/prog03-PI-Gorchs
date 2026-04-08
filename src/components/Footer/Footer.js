import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>Developed by: Bautista Gorchs</p>
      <nav>
        <a
          href="https://github.com/bautistagorchs/prog03-PI-Gorchs"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repository
        </a>
        {" | "}
        <a
          href="https://www.linkedin.com/in/bautistagorchs/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        {" | "}
        <a
          href="https://www.digitalhouse.com/ar/productos/negocios/universidades"
          target="_blank"
          rel="noreferrer"
        >
          About the Project
        </a>
        {" | "}
        <a
          href="https://developer.themoviedb.org/reference/getting-started"
          target="_blank"
          rel="noreferrer"
        >
          API Documentation
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
