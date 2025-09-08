import { useState, useEffect } from "react";
import "./miPerfil.css";
import { Link } from "react-router-dom";
import PerfilSidebar from "./components/perfilSidebar";
import { useContext } from "react";
import { UserContext } from "./components/userContext";

import {
  InformacionUser,
  EditProfile,
  changePassword,
  uploadProfilePhoto,
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
  const [fotoUrl, setFotoUrl] = useState("");
  const [cargando, setCargando] = useState(true);
  const [datosValidos, setDatosValidos] = useState(true);
  const [editMode, setEditMode] = useState(true);
  const [fotoBase64, setFotoBase64] = useState(null);
  const { user, setUser } = useContext(UserContext);

  //funcion para manejar la subida de la foto

  const handleFotoChange = async (e) => {
    if (!editMode) return;
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview local
    setFotoUrl(URL.createObjectURL(file));

    try {
      await uploadProfilePhoto(file);
      const res = await InformacionUser(); // obtiene info actualizada
      setFotoUrl(res.data.foto_perfil || "");
      setUser(res.data); // 🔹 actualiza contexto global
    } catch (err) {
      console.error("Error subiendo foto:", err);
    }
  };

  // carga la información del usuario autenticado
  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        // la ruta acepta un id en la URL pero el servidor toma el id del token
        const res = await InformacionUser(1);
        const data = res.data || {};
        if (!mounted) return;

        // Si no hay datos, retorna null
        if (!data || Object.keys(data).length === 0) {
          setDatosValidos(false);
          setCargando(false);
          return;
        }
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

        if (
          data.foto_perfil_url &&
          typeof data.foto_perfil_url === "string" &&
          data.foto_perfil_url.trim() !== ""
        ) {
          setFotoUrl(data.foto_perfil_url);
        } else {
          setFotoUrl(""); // Usar imagen por defecto
        }
        setCargando(false);
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

  useEffect(() => {
    if (!passwordError) return;

    const timer = setTimeout(() => setPasswordError(""), 2000);
    return () => clearTimeout(timer);
  }, [passwordError]);

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
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt="Foto de perfil"
                className="perfil-avatar-image"
              />
            ) : (
              <div className="perfil-avatar-placeholder">
                <Icon name="user" className="icon-large" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="foto-input"
            onChange={handleFotoChange}
          />
          <button
            className="editar-boton"
            onClick={() => {
              if (editMode) document.getElementById("foto-input").click();
            }}
            disabled={!editMode} // 👈 deshabilitado si no está en edición
          >
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
                disabled={!editMode} // 👈 bloqueo por defecto
              />
            </Field>

            <Field label="Nombre" icon={<Icon name="user" />}>
              <input
                placeholder="Juan Javier"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={!editMode} // 👈 bloqueo por defecto
              />
            </Field>
            <Field label="Correo" icon={<Icon name="mail" />}>
              <input
                placeholder="ejemplo@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={!editMode}
              />
            </Field>
            <Field label="Apellidos" icon={<Icon name="user" />}>
              <input
                placeholder="Perez Maldonado"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                disabled={!editMode}
              />
            </Field>
            <Field label="Género">
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                disabled={!editMode}
              >
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </Field>
          </div>

          {!editMode ? (
            <button className="boton-editar" onClick={() => setEditMode(true)}>
              Editar
            </button>
          ) : (
            <div className="botones-accion">
              <button
                className="boton-guardar"
                onClick={async () => {
                  try {
                    const payload = {
                      telefono,
                      nombre,
                      apellido: apellidos,
                      correo,
                      genero,
                      foto_perfil_url: fotoUrl, // 🔹 usa _url
                    };

                    // Primero actualiza el perfil en backend
                    await axiosInstance.put("/api/MiPerfil/perfil", payload);

                    // Luego obtén la info completa actualizada
                    const fullRes = await InformacionUser();
                    setUser(fullRes.data); // 🔹 esto actualizará el header
                    setEditMode(false);

                    console.log("Perfil actualizado", fullRes.data);
                  } catch (err) {
                    console.error(
                      "Error guardando perfil:",
                      err?.response?.data || err.message || err
                    );
                  }
                }}
              >
                Guardar
              </button>
              <button
                className="boton-cancelar"
                onClick={() => {
                  setEditMode(false);
                  window.location.reload(); // 👈 recargar datos originales
                }}
              >
                Cancelar
              </button>
            </div>
          )}

          {showPasswordModal && (
            <div className="modal-overlay">
              <div className="mPerfil-modal">
                <div className="modal-headerr">
                  <h3 className="label-modal-confirm">Cambio de contraseña</h3>
                  <button
                    className="mPerfil-cancel-button"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    ✕
                  </button>
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
                    <p
                      className="password-error"
                      role="alert"
                      aria-live="assertive"
                    >
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
                    className="MPbtn-secondary"
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
          <Link to="#" className="new-link">
            Autenticación en dos pasos
          </Link>
        </div>

        <p className="historial">
          <Link to="#" className="new-link">
            Historial de actividad
          </Link>
        </p>
      </section>
    </div>
  );
}
