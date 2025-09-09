import React from "react";
import { useNavigate } from "react-router-dom";
import "./notFoundPage.css";
import cartIcon from "./images/logo.png"; // Usa.png aquí el ícono que subiste

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="ntF-error-container">
      <div className="ntF-error-content">
        <img src={cartIcon} alt="Carrito" className="ntF-error-icon" />
        <h1 className="ntF-error-title">404</h1>
        <p className="ntF-error-message">
          ¡Ups! La página que buscas no existe o fue movida.
        </p>
        <button className="ntF-error-button" onClick={() => navigate("/")}>
          ⬅ Regresar al inicio
        </button>
      </div>
    </div>
  );
}
