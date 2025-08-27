import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-form">
      <img className="logo-titulo" src="/logo-easyway.jpg" alt="Logo" />
      <p className="inicio-sesion-text">Inicio de Sesión</p>
      <p className="facil-text">
        Inicia sesion para comprar facil, rapido y seguro
      </p>

      <hr class="linea"></hr>

      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Correo electrónico"
        />

        <input type="text" className="input-field" placeholder="Contraseña" />
      </div>

      <Link
        to="./forgot_password"
        className="forgot-pass-link"
        rel="noopener noreferrer"
      >
        Olvidaste tu contraseña?
      </Link>

      <button className="login-button">Inicia Sesión</button>

      <Link to="./crear_cuenta" className="new-link" rel="noopener noreferrer">
        Nuevo aquí?
      </Link>
    </div>
  );
};

export default Login;
