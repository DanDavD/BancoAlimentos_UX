import "./forgot_password.css";
import { Link } from "react-router-dom";

const Forgot_password = () => {
  return (
    <div className="forgot-form">
      <img className="logo-titulo" src="/logo-easyway.jpg" alt="Logo" />
      <p className="encontremos-text">Encontremos tu cuenta de Easy Way</p>

      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Correo electrónico"
        />
      </div>

      <button className="forgot-button">
        Enviar correo para cambio de contraseña
      </button>
    </div>
  );
};

export default Forgot_password;
