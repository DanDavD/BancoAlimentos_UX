import React, { useState, useEffect } from "react"; 
import "./misDirecciones.css";
import PerfilSidebar from "./components/perfilSidebar";
import * as Icon from "lucide-react";
import EditarDireccionModal from "./editarDireccionModal";
import {
  getDirecciones,
  addDireccion,
  setDireccionDefault,
  eliminarDireccionApi,
  getAllMunicipios,
  getAllDepartamentos,
} from "./api/DireccionesApi";
import { jwtDecode } from "jwt-decode";

export default function MisDirecciones() {
  const [showModal, setShowModal] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    codigoPostal: "",
    calle: "",
    predeterminada: false,
    id_municipio: "",
    id_departamento: "",
  });

  const [errores, setErrores] = useState({});
  
  // ✅ Estado para los toasts
  const [toast, setToast] = useState({ mensaje: "", tipo: "" });

  // ✅ Función para mostrar toast
  const showToast = (mensaje, tipo = "error") => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast({ mensaje: "", tipo: "" }), 3000);
  };

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (err) {
      console.error("Error decodificando token:", err);
      return null;
    }
  };

  useEffect(() => {
    const id_usuario = getUserId();
    if (!id_usuario) return;

    getDirecciones(id_usuario)
      .then((res) => setDirecciones(res.data))
      .catch((err) => console.error("Error al obtener direcciones:", err));
    
    getAllMunicipios()
      .then((res) => setMunicipios(res.data))
      .catch((err) => console.error("Error al obtener municipios:", err));
      
    getAllDepartamentos()
      .then((res) => setDepartamentos(res.data))
      .catch((err) => console.error("Error al obtener departamentos:", err));

  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    let nuevosErrores = {};
    if (!form.calle.trim()) nuevosErrores.calle = "La calle es obligatoria";
    if (!form.codigoPostal.trim()) nuevosErrores.codigoPostal = "El código postal es obligatorio";
    if (!form.id_municipio.trim()) nuevosErrores.id_municipio = "El municipio es obligatorio"; 

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      showToast("Por favor completa todos los campos obligatorios", "error");
      return;
    } else {
      setErrores({});
    }

    try {
      const id_usuario = getUserId();
      if (!id_usuario) {
        showToast("No se encontró usuario logueado", "error");
        return;
      }
      const municipioSeleccionado = municipios.find(m => m.id_municipio == form.id_municipio);
      const payload = {
        id_usuario,
        calle: form.calle,
        codigo_postal: form.codigoPostal,
        predeterminada: form.predeterminada,
        id_municipio: form.id_municipio,
        id_departamento: form.id_departamento,
        ciudad: municipioSeleccionado ? municipioSeleccionado.nombre_municipio : null,
      };

      await addDireccion(payload);

      const res = await getDirecciones(id_usuario);
      setDirecciones(res.data);
      
      setForm({
        codigoPostal: "",
        calle: "",
        predeterminada: false,
        id_municipio: "",
        id_departamento: "",
      });

      showToast("Dirección guardada con éxito ✅", "success");
    } catch (err) {
      console.error("Error al guardar dirección:", err.response ? err.response.data : err);
      showToast("Error al guardar dirección", "error");
    }
  };

  const openEdit = (row) => {
    setForm({
      codigoPostal: row.codigo_postal,
      calle: row.calle,
      predeterminada: row.predeterminada,
      id_municipio: row.id_municipio,
      id_departamento: municipios.find(m => m.id_municipio === row.id_municipio)?.id_departamento || "",
    });
    setEditId(row.id_direccion);
  };

  const removeRow = async (id) => {
    try {
      const id_usuario = getUserId();
      await eliminarDireccionApi({ id_usuario, id_direccion: id });
      const res = await getDirecciones(id_usuario);
      setDirecciones(res.data);
      showToast("Dirección eliminada correctamente 🗑️", "success");
    } catch (err) {
      console.error("Error al eliminar dirección:", err);
      showToast("Error al eliminar dirección", "error");
    }
  };

  const getMunicipioById = (id) => {
    const municipio = municipios.find(m => m.id_municipio === id);
    return municipio ? municipio.nombre_municipio : "";
  };

  const getDeptoPorMunicipio = (idMunicipio) => {
    const municipio = municipios.find(m => m.id_municipio === idMunicipio);
    if (!municipio) return "";
    const departamento = departamentos.find(d => d.id_departamento === municipio.id_departamento);
    return departamento ? departamento.nombre_departamento : "";
  };

  return (
    <div className="mis-direcciones">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <h1 className="titulo">Mis Direcciones</h1>
      <hr className="separador" />

      {/* 📌 Formulario más ancho */}
      <div className="formulario-direccion ancho">
        <form onSubmit={handleSave}>
          <div className="fila">
            <div className="campo">
              <label>Código postal*</label>
              <input
                type="text"
                name="codigoPostal"
                placeholder="Ej: 21101"
                value={form.codigoPostal}
                onChange={handleChange}
              />
              {errores.codigoPostal && <p className="error">{errores.codigoPostal}</p>}
            </div>
            <div className="campo">
              <label>Departamento*</label>
              <select
                name="id_departamento"
                value={form.id_departamento}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                {departamentos.map((d) => (
                  <option key={d.id_departamento} value={d.id_departamento}>
                    {d.nombre_departamento}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="fila">
            <div className="campo">
              <label>Municipio*</label>
              <select
                name="id_municipio"
                value={form.id_municipio}
                onChange={handleChange}
                key={form.id_departamento}
              >
                <option value="">Seleccionar</option>
                {municipios
                  .filter(m => m.id_departamento == form.id_departamento)
                  .map(m => (
                    <option key={m.id_municipio} value={m.id_municipio}>
                      {m.nombre_municipio}
                    </option>
                  ))}
              </select>
              {errores.id_municipio && <p className="error">{errores.id_municipio}</p>}
            </div>
            <div className="campo">
              <label>Calle, casa/apartamento*</label>
              <input
                type="text"
                name="calle"
                placeholder="Ej: Calle José Ortega"
                value={form.calle}
                onChange={handleChange}
              />
              {errores.calle && <p className="error">{errores.calle}</p>}
            </div>
          </div>

          <div className="check">
            <input
              type="checkbox"
              id="predeterminado"
              name="predeterminada"
              checked={form.predeterminada}
              onChange={handleChange}
            />
            <label htmlFor="predeterminado">
              Establecer como dirección de envío predeterminada
            </label>
          </div>

          <div className="botones">
            <button type="submit" className="btn-guardar">
              {editId ? "Actualizar" : "Guardar"}
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => {
                setForm({
                  codigoPostal: "",
                  calle: "",
                  predeterminada: false,
                  id_municipio: "",
                  id_departamento: "",
                });
                setEditId(null);
                setErrores({});
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* 📌 Tabla más ancha */}
      <div className="tabla-direcciones ancho">
        <table className="table">
          <thead>
            <tr>
              <th>ID de Dirección</th>
              <th>Código Postal</th>
              <th>Departamento</th>
              <th>Calle</th>
              <th>Ciudad</th>
              <th>Predeterminada</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {direcciones.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                  No hay direcciones registradas.
                </td>
              </tr>
            ) : (
              direcciones.map((d) => (
                <tr key={d.id_direccion}>
                  <td>{d.id_direccion}</td>
                  <td>{d.codigo_postal}</td>
                  <td>{d.id_municipio ? getDeptoPorMunicipio(d.id_municipio) : "N/A"}</td>
                  <td>{d.calle}</td>
                  <td>{d.id_municipio ? getMunicipioById(d.id_municipio) : "N/A"}</td>
                  <td>{d.predeterminada ? "Sí" : "No"}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          openEdit(d);
                          setShowModal(true);
                        }}
                        className="p-2 rounded-xl border border-[#d8dadc] hover:bg-[#2ca9e3]/20"
                        title="Editar"
                      >
                        <Icon.Edit className="text-[#2ca9e3]" size={16} />
                      </button>
                      <button
                        onClick={() => removeRow(d.id_direccion)}
                        className="p-2 rounded-xl border border-[#d8dadc] hover:bg-red-50"
                        title="Eliminar"
                      >
                        <Icon.Trash className="text-red-500" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditarDireccionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
      />

      {/* ✅ Toast */}
      {toast.mensaje && (
        <div className={`toast ${toast.tipo}`}>
          {toast.mensaje}
        </div>
      )}
    </div>
  );
}
