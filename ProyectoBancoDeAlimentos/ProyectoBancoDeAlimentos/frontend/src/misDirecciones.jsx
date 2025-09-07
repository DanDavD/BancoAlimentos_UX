import React, { useState, useEffect } from "react";
import "./misDirecciones.css";
import PerfilSidebar from "./components/perfilSidebar";
import * as Icon from "lucide-react";
import EditarDireccionModal from "./editarDireccionModal";
import { getDirecciones, addDireccion, setDireccionDefault } from "./api/DireccionesApi";
import { jwtDecode } from "jwt-decode";

export default function MisDirecciones() {
  const [showModal, setShowModal] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    codigoPostal: "",
    departamento: "",
    ciudad: "",
    calle: "",
    predeterminada: false,
  });

  // Estado para errores de validación
  const [errores, setErrores] = useState({});

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

    // VALIDACIONES
    let nuevosErrores = {};
    if (!form.calle.trim()) nuevosErrores.calle = "La calle es obligatoria";
    if (!form.ciudad.trim()) nuevosErrores.ciudad = "La ciudad es obligatoria";
    if (!form.departamento.trim()) nuevosErrores.departamento = "El departamento es obligatorio";
    if (!/^\d{5}$/.test(form.codigoPostal)) nuevosErrores.codigoPostal = "El código postal debe tener 5 dígitos";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    } else {
      setErrores({});
    }

    try {
      const id_usuario = getUserId();
      if (!id_usuario) {
        console.error("No se encontró usuario logueado");
        return;
      }

      if (editId) {
        // Editar solo local por ahora
        setDirecciones(
          direcciones.map((d) =>
            d.id === editId ? { ...d, ...form } : d
          )
        );
        setEditId(null);
      } else {
        const payload = {
          calle: form.calle,
          ciudad: form.ciudad,
          codigo_postal: form.codigoPostal,
          predeterminada: form.predeterminada,
          departamento: form.departamento,
        };

        await addDireccion({ id_usuario, ...payload });

        // Refrescar tabla
        const res = await getDirecciones(id_usuario);
        setDirecciones(res.data);
      }

      // Reset form
      setForm({
        codigoPostal: "",
        departamento: "",
        ciudad: "",
        calle: "",
        predeterminada: false,
      });
    } catch (err) {
      console.error("Error al guardar dirección:", err);
    }
  };

  const openEdit = (row) => {
    setForm({
      codigoPostal: row.codigo_postal,
      departamento: row.departamento || "",
      ciudad: row.ciudad,
      calle: row.calle,
      predeterminada: row.predeterminada,
    });
    setEditId(row.id_direccion);
  };

  const removeRow = async (id) => {
    try {
      const id_usuario = getUserId();
      await deleteDireccion({ id_usuario, id_direccion: id });
      const res = await getDirecciones(id_usuario);
      setDirecciones(res.data);
    } catch (err) {
      console.error("Error al eliminar dirección:", err);
    }
  };

  return (
    <div className="mis-direcciones">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <h1 className="titulo">Mis Direcciones</h1>
      <hr className="separador" />

      <div className="formulario-direccion">
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
                name="departamento"
                value={form.departamento}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option>Cortés</option>
                <option>Atlántida</option>
                <option>Yoro</option>
              </select>
              {errores.departamento && <p className="error">{errores.departamento}</p>}
            </div>
          </div>

          <div className="fila">
            <div className="campo">
              <label>Municipio*</label>
              <input
                type="text"
                name="municipio"
                placeholder="Ej: Lima"
                value={form.municipio}
                onChange={handleChange}
              />
              {errores.municipio && <p className="error">{errores.municipio}</p>}
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
                  departamento: "",
                  ciudad: "",
                  calle: "",
                  predeterminada: false,
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

      <div className="tabla-direcciones">
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
                  <td>{d.departamento}</td>
                  <td>{d.calle}</td>
                  <td>{d.ciudad}</td>
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
    </div>
  );
}
