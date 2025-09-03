import { useState } from "react";
import "./miPerfil.css";
import { Link } from "react-router-dom";
import PerfilSidebar from "./components/perfilSidebar";

function Icon({ name, className = "icon" }) {
  switch (name) {
    case "user":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <circle cx="12" cy="8" r="4" strokeWidth="1.8" />
          <path d="M4 20c2-4 14-4 16 0" strokeWidth="1.8" />
        </svg>
      );
    case "mail":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.8" />
          <path d="M3 7l9 6 9-6" strokeWidth="1.8" />
        </svg>
      );
    case "camera":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <path d="M4 8h4l2-2h4l2 2h4v12H4z" strokeWidth="1.8" />
          <circle cx="12" cy="14" r="3.5" strokeWidth="1.8" />
        </svg>
      );
    default:
      return null;
  }
}

function Field({ label, icon, children }) {
  return (
    <div className="field-container">
      <span className="field-label">{label}</span>
      <div className="field-input">
        {icon && <span className="field-icon">{icon}</span>}
        {children}
      </div>
    </div>
  );
}

export default function MiPerfil() {
  const [genero, setGenero] = useState("Masculino");
  const [rol, setRol] = useState("Administrador");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="perfil-container">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <h1 className="perfil-title">Editar Perfil</h1>
      <hr className="perfil-separator" />
      <p className="Datos-text">Datos Generales</p>

      <div className="perfil-content">
        {/* Sidebar */}
        <aside className="perfil-sidebar">
          <div className="perfil-avatar">
            <Icon name="user" className="icon-large" />
          </div>
          <button className="editar-boton">
            <Icon name="camera" className="icon-small" />
            <span>Editar foto</span>
          </button>
        </aside>

        {/* Card principal */}
        <section className="perfil-card">
          <div className="fields-grid">
            <Field label="Telefono" icon={<Icon name="number" />}>
              <input placeholder="Telefono" />
            </Field>

            <Field label="Nombre" icon={<Icon name="user" />}>
              <input placeholder="Juan Javier" />
            </Field>
            <Field label="Correo" icon={<Icon name="mail" />}>
              <input placeholder="ejemplo@gmail.com" />
            </Field>
            <Field label="Apellidos" icon={<Icon name="user" />}>
              <input placeholder="Perez Maldonado" />
            </Field>
            <Field label="Género">
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </Field>
          </div>

          <button className="boton-guardar"> Guardar</button>

          {showPasswordModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>Cambio de contraseña</h3>
                  <button onClick={() => setShowPasswordModal(false)}>✕</button>
                </div>
                <div className="modal-body">
                  <label>Contraseña anterior</label>
                  <input type="password" />
                  <label>Nueva contraseña</label>
                  <input type="password" />
                  <label>Confirmación de nueva contraseña</label>
                  <input type="password" />
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="btn-danger"
                  >
                    Cancelar
                  </button>
                  <button className="btn-secondary">Guardar</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="configuracion-container">
        <h1 className="Config">Configuracion</h1>
        <div className="candado-link">
          <img src="/Vector.png" alt="imagen" className="candado" />
          <Link
            to="#"
            className="new-link"
            onClick={() => setShowPasswordModal(true)}
          >
            Cambiar contraseña
          </Link>
        </div>

        <div className="f2-autenticacion">
          <img src="/f2.png" alt="imagen" className="f2" />
          <p className="f2">Autenticación en dos pasos</p>
        </div>

        <p className="historial">Historial de Acceso</p>
      </section>
    </div>
  );
}
