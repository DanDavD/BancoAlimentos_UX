// src/TestAuth.jsx
import LoginUser, { RegistrarUser, InformacionUser ,InformacionRole, EditProfile, updateUserById} from "../api/Usuario.Route";
// Si quieres probar una ruta protegida después de login, descomenta la siguiente línea
// import api from "./api/axiosInstance";
import {getAllProducts, getAllSucursales} from "../api/InventarioApi";
export default function TestAuth() {

  const handleRegister = async () => {
    const payload = {
      nombre: 'Kenny EDIT',
    telefono: '9999-1111',
    foto_perfil_url: null,
    tema: false,
    };

    console.log("[REGISTER] request:", payload);
    try {
      const res = await getAllSucursales();
      console.log("[REGISTER] status:", res.status);
      console.log("[REGISTER] data:", res.data);
    } catch (err) {
      console.error("[REGISTER] error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Error al registrarse");
    }
  };

  // (Opcional) Probar endpoint protegido después del login
  // Asegúrate de que exista en tu backend (cámbialo por /api/perfil o /api/auth/me)
  // const handleWhoAmI = async () => {
  //   try {
  //     const res = await api.get("/api/auth/me");
  //     console.log("[ME] status:", res.status);
  //     console.log("[ME] data:", res.data);
  //   } catch (err) {
  //     console.error("[ME] error:", err?.response?.data || err);
  //   }
  // };

  return (
    <div style={{ padding: 24 }}>
      <h2>Test Auth</h2>
      <p>Abre la consola del navegador para ver los logs.</p>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={handleRegister}>Probar Registro (valores por defecto)</button>
        {/* <button onClick={handleWhoAmI}>Probar ruta protegida</button> */}
      </div>
    </div>
  );
}
