import React, { useState } from "react";
import "./misDirecciones.css";
import PerfilSidebar from "./components/perfilSidebar";
import * as Icon from "lucide-react"; // para los íconos
import EditarDireccionModal from "./editarDireccionModal";

export default function MisDirecciones() {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    codigoPostal: "",
    departamento: "",
    ciudad: "",
    calle: "",
    predeterminada: false,
  });

  const [direcciones, setDirecciones] = useState([]);
  const [editId, setEditId] = useState(null);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Guardar nueva dirección o actualizar existente
  const handleSave = (e) => {
    e.preventDefault();

    if (
      !form.codigoPostal ||
      !form.departamento ||
      !form.ciudad ||
      !form.calle
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (editId) {
      // Editar
      setDirecciones(
        direcciones.map((d) => (d.id === editId ? { ...d, ...form } : d))
      );
      setEditId(null);
    } else {
      // Agregar nueva
      const nuevaDireccion = { id: Date.now(), ...form };
      setDirecciones([...direcciones, nuevaDireccion]);
    }

    // Reset form
    setForm({
      codigoPostal: "",
      departamento: "",
      ciudad: "",
      calle: "",
      predeterminada: false,
    });
  };

  // Editar fila
  const openEdit = (row) => {
    setForm(row);
    setEditId(row.id);
  };

  // Eliminar fila
  const removeRow = (id) => {
    setDirecciones(direcciones.filter((d) => d.id !== id));
  };

  return (
    <div className="mis-direcciones">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <h1 className="titulo">Mis Direcciones</h1>
      <hr className="separador" />

      {/* ---------- FORMULARIO ---------- */}
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
            </div>
            <div className="campo">
              <label>Departamento</label>
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
            </div>
          </div>

          <div className="fila">
            <div className="campo">
              <label>Ciudad*</label>
              <input
                type="text"
                name="ciudad"
                placeholder="Ej: Lima"
                value={form.ciudad}
                onChange={handleChange}
              />
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
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* ---------- TABLA ---------- */}
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
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "15px" }}
                >
                  No hay direcciones registradas.
                </td>
              </tr>
            ) : (
              direcciones.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.codigoPostal}</td>
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
                        onClick={() => removeRow(d.id)}
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
