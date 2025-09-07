import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegistrarUser } from "./api/Usuario.Route"; // Ajusta la ruta según tu estructura
import "./crear_cuenta.css";
const Crear_cuenta = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    telefono: "",
    genero: "otro"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validar campos obligatorios
      if (!formData.nombre || !formData.correo || !formData.contraseña) {
        throw new Error("Nombre, correo y contraseña son obligatorios");
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.correo)) {
        throw new Error("Por favor ingresa un correo electrónico válido");
      }

      // Añadir id_rol por defecto (2 para cliente)
      const userData = {
        ...formData,
        id_rol: 2
      };

      // Llamar a la API de registro
      const response = await RegistrarUser(userData);
      
      if (response.data) {
        // Registro exitoso
        alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error en registro:", err);
      
      // Mejor manejo de errores
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error del servidor");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error desconocido al crear la cuenta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-form">
      <img className="logo-titulo" src="/logo-easyway.png" alt="Logo" />
      <p className="crear-text">Crear cuenta</p>
      <p className="menosmin-text">Crea tu cuenta en menos de un minuto!</p>

      <hr className="linea"></hr>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Nombre *"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="input-field"
            placeholder="Correo electrónico *"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="input-field"
            placeholder="Contraseña *"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
            minLength="6"
          />

          <input
            type="tel"
            className="input-field"
            placeholder="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />

      
        </div>

        <button 
          type="submit" 
          className="crear-button"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

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