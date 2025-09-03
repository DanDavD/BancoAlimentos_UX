import { Link } from "react-router-dom";
import "./crear_cuenta.css";

const Crear_cuenta = () => {
  return (
    <div className="crear-form">
      <img className="logo-titulo" src="/logo-easyway.png" alt="Logo" />
      <p className="crear-text">Crear cuenta</p>
      <p className="menosmin-text">Crea tu cuenta en menos de un minuto!</p>

      <hr class="linea"></hr>

      <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Nombre" />

        <input
          type="text"
          className="input-field"
          placeholder="Correo electrónico"
        />

        <input type="text" className="input-field" placeholder="Contraseña" />

        <input type="text" className="input-field" placeholder="Teléfono" />
      </div>

      <button className="crear-button">Crear cuenta</button>

      <Link
        to="/login"
        className="ya-tienes-cuenta-link"
        rel="noopener noreferrer"
      >
        Ya tienes una cuenta?
      </Link>
    </div>
  );
};

export default Crear_cuenta;
