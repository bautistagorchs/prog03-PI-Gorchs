import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-spinner"></div>
      <p className="loader-text">Cargando...</p>
    </div>
  );
};

export default Loader;
