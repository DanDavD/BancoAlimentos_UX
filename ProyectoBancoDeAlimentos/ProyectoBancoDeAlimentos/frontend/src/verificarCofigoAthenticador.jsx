import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import LoginUser ,{ validarCodigo, InformacionUser } from "./api/Usuario.Route";
import "./verificarcodigo.css";


export default function VerificarCodigoAuth() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Recupera lo que guardó la pantalla de login
  const prelogin = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("prelogin") || "{}");
    } catch {
      return {};
    }
  }, []);

  const [correo, setCorreo] = useState(state?.correo || prelogin?.correo || "");
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);

  // Si llegaron directo sin correo, deja que lo escriban o regrésalos
  useEffect(() => {
    if (!correo && state?.correo) setCorreo(state.correo);
  }, [state, correo]);

  const resolveRoleName = (me) => {
    if (!me) return "cliente";
    return (
      me?.rol?.nombre_rol ||
      me?.rol ||
      (typeof me?.id_rol === "number" ? (me.id_rol === 1 ? "administrador" : "cliente") : "cliente")
    );
  };

  async function handleVerify(e) {
    e.preventDefault();
    if (!correo || !codigo) return alert("Completa correo y código.");

    try {
      setLoading(true);

      // 1) Verificar el código (el helper acepta (correo, codigo) y arma { correo, codigo } en el body)
      const { data } = await validarCodigo(correo, codigo);
      const ok = data?.ok === true || data === "Codigo valido!" || data?.valid === true;
      if (!ok) {
        alert("El código no es válido.");
        return;
      }

      // 2) Tomar la contraseña guardada por Login (puede venir en state o en sessionStorage)
      const pass =
        state?.contraseña ??
        state?.contrasena ??
        prelogin?.contraseña ??
        prelogin?.contrasena;

      if (!pass) {
        alert("Sesión temporal expirada. Vuelve a iniciar sesión.");
        return navigate("/login");
      }

      // 3) Hacer el login REAL
      const loginRes = await LoginUser({ correo, contraseña: pass, contrasena: pass });
      const token = loginRes?.data?.token;
      if (!token) throw new Error("No se recibió token de autenticación");
      localStorage.setItem("token", token);

      // 4) Obtener /me y resolver rol
      let me = null;
      try {
        const meRes = await InformacionUser(); // tu /me
        me = meRes?.data?.user ?? meRes?.data ?? null;
      } catch {
        me = null; // si falla, asumimos cliente
      }

      const roleName = resolveRoleName(me);
      localStorage.setItem("rol", roleName);

      // 5) Limpiar y redirigir
      sessionStorage.removeItem("prelogin");
      if (roleName.toLowerCase() === "administrador") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err?.response?.data || err);
      alert(err?.response?.data?.error || err?.response?.data?.message || "Error al verificar");
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="verify-code">        {/* <- wrapper que aísla estilos */}
      <form className="forgot-form" onSubmit={handleVerify}>
        <img className="logo-titulo" src="/logo-easyway.png" alt="Logo" />
        <p className="encontremos-text">Ingresa el código enviado a tu correo</p>

        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Código de verificación"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>

        <button className="forgot-button" disabled={loading}>
          {loading ? "Verificando..." : "Verificar código"}
        </button>
      </form>
    </div>
  );
}
