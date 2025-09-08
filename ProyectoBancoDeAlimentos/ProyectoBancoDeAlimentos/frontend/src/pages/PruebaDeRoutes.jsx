// src/TestAuth.jsx
import React, { useEffect } from "react";
import LoginUser, {
  RegistrarUser,
  InformacionUser,
  InformacionRole,
  EditProfile,
  updateUserById,
} from "../api/Usuario.Route";
import { getAllPorcentajeGanancia, getProductosRecomendados,addCupon,getCuponesByUser,getAllCupones } from "../api/InventarioApi";
import { forgetPassword, validarCodigo, changePassword } from "../api/Usuario.Route";
import { getAllFacturasByUserwithDetails } from "../api/FacturaApi";
export default function TestAuth() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const productos = async () => {
      try {
        const id_usuario = 3;
        const codigo_cupon = "DESCUENTO152";
        const res = await getCuponesByUser(id_usuario);
        console.log(res.data);
        setProducts(res.data); // Guarda productos en el estado
      } catch (err) {
        console.error("[REGISTER] error:", err?.response?.data || err);
        alert(err?.response?.data?.message || "Error");
      }
    };
    productos();
    console.log(productos.data);

    return () => {};
  }, []);

  const handleRegister = async () => {
    try {
      const id_usuario = 3
      const codigo_cupon = "DESCUENTO152";
      const res = await getAllFacturasByUserwithDetails(2);
      console.log("[REGISTER] status:", res.status);
      console.log("[REGISTER] data:", res.data);
    } catch (err) {
      console.error("[REGISTER] error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Test Auth</h2>
      <p>Abre la consola del navegador para ver los logs.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: "16px" }}>
        <button onClick={handleRegister}>
          Probar Registro (valores por defecto)
        </button>
      </div>

      {/* Mostrar lista de productos */}
      <h3>Productos:</h3>
      {Array.isArray(products) && products.length === 0 ? (
        <p>No hay productos cargados</p>
      ) : Array.isArray(products) ? (
        <ul>
          {products.map((prod, idx) => (
            <li key={idx}>
              {prod.nombre} - {prod.precio_base} Lps
            </li>
          ))}
        </ul>
      ) : (
        <p>Error: la respuesta no es una lista de productos</p>
      )}
    </div>
  );
}
