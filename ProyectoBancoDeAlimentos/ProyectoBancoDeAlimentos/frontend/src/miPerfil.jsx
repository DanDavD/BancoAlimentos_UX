import { useState, useEffect } from "react";
import "./miPerfil.css";
import { Link } from "react-router-dom";
import PerfilSidebar from "./components/perfilSidebar";
import {
  InformacionUser,
  EditProfile,
  changePassword,
} from "./api/Usuario.Route";
import axiosInstance from "./api/axiosInstance";

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
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [rol, setRol] = useState("Administrador");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // carga la información del usuario autenticado
  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        // la ruta acepta un id en la URL pero el servidor toma el id del token
        const res = await InformacionUser(1);
        const data = res.data || {};
        if (!mounted) return;

        // Asumir nombres de campo comunes; ajustar si el backend devuelve otros
        setTelefono(
          data.telefono || data.numero_telefono || data.telefono_usuario || ""
        );
        setNombre(data.nombre || data.nombre_usuario || data.nombres || "");
        setApellidos(
          data.apellido || data.apellidos || data.apellido_usuario || ""
        );
        setCorreo(data.correo || data.email || "");
        if (data.genero) setGenero(data.genero);
        if (data.rol?.nombre_rol) setRol(data.rol.nombre_rol);
      } catch (err) {
        // no interrumpir la UI; podríamos mostrar un toast en el futuro
        console.error(
          "Error cargando usuario:",
          err?.response?.data || err.message || err
        );
      }
    };

    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

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
              <input
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Field>

            <Field label="Nombre" icon={<Icon name="user" />}>
              <input
                placeholder="Juan Javier"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Field>
            <Field label="Correo" icon={<Icon name="mail" />}>
              <input
                placeholder="ejemplo@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Field>
            <Field label="Apellidos" icon={<Icon name="user" />}>
              <input
                placeholder="Perez Maldonado"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
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

          <button
            className="boton-guardar"
            onClick={async () => {
              try {
                const payload = {
                  telefono,
                  nombre,
                  apellidos,
                  correo,
                  genero,
                };
                const res = await EditProfile(payload);
                console.log("Perfil actualizado", res.data);
                // podríamos mostrar feedback visual aquí
              } catch (err) {
                console.error(
                  "Error guardando perfil:",
                  err?.response?.data || err.message || err
                );
              }
            }}
          >
            {" "}
            Guardar
          </button>

          {showPasswordModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>Cambio de contraseña</h3>
                  <button onClick={() => setShowPasswordModal(false)}>✕</button>
                </div>
                <div className="modal-body">
                  <label>Contraseña anterior</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label>Confirmación de nueva contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p style={{ color: "red", marginTop: 8 }}>
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="btn-danger"
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={async () => {
                      // validar nueva vs confirmacion
                      setPasswordError("");
                      if (!oldPassword || !newPassword || !confirmPassword) {
                        setPasswordError("Completa todos los campos");
                        return;
                      }
                      if (newPassword !== confirmPassword) {
                        setPasswordError(
                          "La nueva contraseña y la confirmación no coinciden"
                        );
                        return;
                      }
                      if (newPassword.length < 6) {
                        setPasswordError(
                          "La contraseña debe tener al menos 6 caracteres"
                        );
                        return;
                      }

                      try {
                        setPasswordLoading(true);
                        // Verificar contraseña anterior intentando login (no sobrescribimos token manualmente)
                        await axiosInstance.post("/api/auth/login", {
                          correo,
                          ["contraseña"]: oldPassword,
                        });

                        // Si la verificación pasa, llamar al endpoint para cambiar la contraseña
                        await changePassword(correo, newPassword);

                        // limpiar estado y cerrar modal
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setShowPasswordModal(false);
                        // podría mostrar un toast aquí
                      } catch (err) {
                        const msg =
                          err?.response?.data?.message ||
                          err?.response?.data ||
                          err.message ||
                          String(err);
                        setPasswordError(
                          msg.includes("Contraseña incorrecta")
                            ? "Contraseña anterior incorrecta"
                            : msg
                        );
                        console.error("Error cambiando contraseña:", err);
                      } finally {
                        setPasswordLoading(false);
                      }
                    }}
                  >
                    {passwordLoading ? "Guardando..." : "Guardar"}
                  </button>
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
