import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginUser from "./api/Usuario.Route";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!correo || !contraseña) {
      return alert("Ingresa correo y contraseña.");
    }

    try {
      setLoading(true);

      // Llamada al backend
      const res = await LoginUser({ correo, contraseña });

      // Guardar token si existe
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("rol", res.data.user.rol); // Guardamos el rol
      }

      console.log("LOGIN OK:", res.data);

      // Redirigir según rol
      if (res.data.user.rol === "ADMINISTRADOR") {
        navigate("/inicioAdmin"); // admin
      } else {
        navigate("/inicioUsuario"); // cliente
      }
    } catch (err) {
      console.error(err?.response?.data || err);
      alert(err?.response?.data?.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <img className="logo-titulo" src="/logo-easyway.jpg" alt="Logo" />
      <p className="inicio-sesion-text">Inicio de Sesión</p>
      <p className="facil-text">
        Inicia sesion para comprar facil, rapido y seguro
      </p>

      <hr className="linea"></hr>

      <form onSubmit={onSubmit}>
        <div className="input-wrapper" style={{ marginLeft: 100 }}>
          <input
            type="email"
            className="input-field"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContrasena(e.target.value)}
            autoComplete="current-password"
            required
            minLength={4}
          />
        </div>

        <Link
          to="./forgot_password"
          className="forgot-pass-link"
          rel="noopener noreferrer"
        >
          Olvidaste tu contraseña?
        </Link>

        <button className="login-button" disabled={loading}>
          {loading ? "Cargando..." : "Inicia Sesión"}
        </button>
      </form>
      <Link to="./crear_cuenta" className="new-link" rel="noopener noreferrer">
        Nuevo aquí?
      </Link>
    </div>
  );
};

export default Login;
