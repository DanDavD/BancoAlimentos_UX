import React, { useMemo, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./UserManagementViews.css";

/** Seed */
const SEED_USERS = [
  { id: "001", firstName: "Harold", lastName: "Dias", role: "Administrador", status: "ACTIVO", avgSpendLps: 2300, frequency: "4 veces por mes", favorite: "Café", joinDate: "03/05/2024", privileges: [1,3] },
  { id: "002", firstName: "Elisa", lastName: "Paz", role: "Usuario", status: "ACTIVO", avgSpendLps: 15000.1, frequency: "5 veces por mes", favorite: "Manzanas", joinDate: "12/08/2025", privileges: [] },
  { id: "003", firstName: "Rene", lastName: "Reyes", role: "Administrador", status: "ACTIVO", avgSpendLps: 5200, frequency: "3 veces por mes", favorite: "Leche", joinDate: "22/11/2024", privileges: [2,4,5] },
  { id: "004", firstName: "Harold", lastName: "Juanse", role: "Usuario", status: "ACTIVO", avgSpendLps: 1800, frequency: "2 veces por mes", favorite: "Galletas", joinDate: "09/01/2025", privileges: [] },
  { id: "005", firstName: "Elisa", lastName: "Oliva", role: "Administrador", status: "ACTIVO", avgSpendLps: 9800, frequency: "6 veces por mes", favorite: "Cereal", joinDate: "28/02/2025", privileges: [1,2,3,4,5,6] },
  { id: "006", firstName: "Juan", lastName: "Perez", role: "Administrador", status: "ACTIVO", avgSpendLps: 4200, frequency: "1 vez por mes", favorite: "Refresco", joinDate: "13/03/2025", privileges: [] },
  { id: "007", firstName: "Hernan", lastName: "Soler", role: "Usuario", status: "INACTIVO", avgSpendLps: 0, frequency: "-", favorite: "-", joinDate: "01/04/2025", privileges: [] },
];

const PRIV_LIST = [
  { id: 1, label: "Gestionar Productos" },
  { id: 2, label: "Gestionar Inventario" },
  { id: 3, label: "Ver reportes" },
  { id: 4, label: "Privilegio 4" },
  { id: 5, label: "Privilegio 5" },
  { id: 6, label: "Privilegio 6" },
];

const StatusBadge = ({ value }) => (
  <span className={"status-badge " + (value === "ACTIVO" ? "activo" : "inactivo")}>
    {value}
  </span>
);
const RolePill = ({ role }) => <span className="role-pill">{role}</span>;

/** Modal base */
const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/** Campo */
function Field({ label, value, onChange, readOnly, as = "input", children, placeholder }) {
  return (
    <label>
      <span>{label}</span>
      {as === "select" ? (
        <select value={value} onChange={onChange} disabled={readOnly}>
          {children}
        </select>
      ) : (
        <input
          readOnly={readOnly}
          value={value}
          onChange={onChange || (() => {})}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

/** Tabs */
function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      <div className="tabs-nav">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tab-btn ${active === t.key ? "active" : ""}`}
            onClick={() => onChange(t.key)}
            type="button"
          >
            {t.icon && <Icon icon={t.icon} />}
            {t.label}
          </button>
        ))}
      </div>
      <div className="tabs-body">
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}

export default function UserManagementViews() {
  const [users, setUsers] = useState(SEED_USERS);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [createOpen, setCreateOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [infoUser, setInfoUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Tabs state
  const [infoTab, setInfoTab] = useState("resumen"); // solo Resumen en Info
  const [editTab, setEditTab] = useState("datos");   // Datos / Privilegios (si procede)

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    role: "Usuario",
    status: "ACTIVO",
    privileges: [],
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.id, u.firstName, u.lastName, u.role, u.status].join(" ").toLowerCase().includes(q)
    );
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const visible = filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  const nextId = () => {
    const max = users.reduce((m, u) => Math.max(m, parseInt(u.id, 10)), 0);
    return String(max + 1).padStart(3, "0");
  };

  /** Crear */
  const handleCreate = () => {
    const { firstName, lastName } = newUser;
    if (!firstName.trim() || !lastName.trim()) {
      alert("Nombre y Apellido son obligatorios.");
      return;
    }
    const user = {
      ...newUser,
      id: nextId(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avgSpendLps: 0,
      frequency: "-",
      favorite: "-",
      joinDate: new Date().toLocaleDateString("es-HN"),
    };
    setUsers((prev) => [...prev, user]);
    setCreateOpen(false);
    setNewUser({ firstName: "", lastName: "", role: "Usuario", status: "ACTIVO", privileges: [] });
    setPage(Math.max(1, Math.ceil((filtered.length + 1) / pageSize)));
  };

  /** Abrir/Cerrar INFO */
  const openInfo = (u) => {
    setInfoUser(u);
    setInfoTab("resumen"); // siempre comienza en resumen
    setInfoOpen(true);
  };
  const closeInfo = () => { setInfoOpen(false); setInfoUser(null); };

  /** Abrir/Cerrar EDIT */
  const openEdit = (u) => {
    setEditUser({ ...u });
    setEditTab("datos"); // siempre comienza en datos
    setEditOpen(true);
  };
  const closeEdit = () => { setEditOpen(false); setEditUser(null); };

  /** Guardar edición */
  const saveEdit = () => {
    if (!editUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...editUser } : u)));
    closeEdit();
  };

  // (Opcional) Si el rol ya no es consultor/consultante, limpia privilegios
  useEffect(() => {
    if (!editUser) return;
    const isConsult = ["Consultante", "Consultor"].includes(editUser.role);
    if (!isConsult && (editUser.privileges?.length || 0) > 0) {
      setEditUser({ ...editUser, privileges: [] });
    }
  }, [editUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatLps = (n) => `L. ${n.toLocaleString("es-HN", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;

  return (
    <div className="page-container">
      <main className="main-content">
        <header className="page-header">
          <h1><span className="accent">Gestión Perfil De Usuarios</span></h1>

          <button className="btn-primary" onClick={() => setCreateOpen(true)}>
            <Icon icon="mdi:account-plus" />
            <span>Crear Usuario</span>
          </button>
        </header>

        <div className="search-bar">
          <div className="search-input">
            <Icon icon="mdi:magnify" className="search-icon" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar Usuario"
            />
          </div>

          <div className="user-count">
            <span>Usuarios registrados:</span>
            <span className="count-bubble">{filtered.length}</span>
          </div>
        </div>

        {/* Tabla */}
        <div className="table-container">
          <table className="users-table">
            <colgroup>
              <col className="col-id" />
              <col className="col-name" />
              <col className="col-last" />
              <col className="col-status" />
              <col className="col-role" />
              <col className="col-actions" />
            </colgroup>

            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {visible.map((u) => (
                <tr key={u.id}>
                  <td className="cell-center">{u.id}</td>
                  <td className="cell-left"><span className="truncate">{u.firstName}</span></td>
                  <td className="cell-left"><span className="truncate">{u.lastName}</span></td>
                  <td className="cell-center"><StatusBadge value={u.status} /></td>
                  <td className="cell-center"><RolePill role={u.role} /></td>
                  <td className="cell-center">
                    <div className="action-buttons">
                      <button onClick={() => openInfo(u)} aria-label="Información"><Icon icon="mdi:eye-outline" /></button>
                      <button onClick={() => openEdit(u)} aria-label="Editar"><Icon icon="mdi:pencil-outline" /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                    No hay resultados para “{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pageSafe === 1} aria-label="Página anterior">
            <Icon icon="mdi:chevron-left" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={n === pageSafe ? "active" : ""} aria-label={`Ir a página ${n}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={pageSafe === totalPages} aria-label="Página siguiente">
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </main>

      {/* CREAR */}
      <Modal open={createOpen} title="Crear usuario" onClose={() => setCreateOpen(false)}>
        <div className="modal-body modal-grid-2">
          <Field label="Nombre" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} placeholder="Nombre" />
          <Field label="Apellido" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} placeholder="Apellido" />
          <Field label="Rol" as="select" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option>Usuario</option>
            <option>Administrador</option>
            <option>Consultante</option>
          </Field>
          <Field label="Estado" as="select" value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </Field>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setCreateOpen(false)}>Cancelar</button>
          <button className="btn-primary" onClick={handleCreate}>
            <Icon icon="mdi:plus" /> Crear
          </button>
        </div>
      </Modal>

     {/* CONSULTAR (Resumen + Privilegios SOLO si es Consultante/Consultor, read-only) */}
<Modal open={infoOpen} title="Información del usuario" onClose={closeInfo}>
  {infoUser && (
    <Tabs
      active={infoTab}
      onChange={setInfoTab}
      tabs={[
        {
          key: "resumen",
          label: "Resumen",
          icon: "mdi:account-badge",
          content: (
            <div className="modal-body modal-grid-2">
              <Field label="ID" value={infoUser.id} readOnly />
              <Field label="Rol" value={infoUser.role} readOnly />
              <Field label="Estado" value={infoUser.status} readOnly />
              <Field label="Fecha de ingreso" value={infoUser.joinDate} readOnly />
              <Field label="Promedio compra" value={formatLps(infoUser.avgSpendLps)} readOnly />
              <Field label="Frecuencia" value={infoUser.frequency} readOnly />
              <Field label="Favorito" value={infoUser.favorite} readOnly />
            </div>
          ),
        },
        // Tab Privilegios solo si es Consultante/Consultor
        ...(
          ["Consultante","Consultor"].includes(infoUser.role)
            ? [{
                key: "priv",
                label: "Privilegios",
                icon: "mdi:shield-key-outline",
                content: (
                  <div className="priv-list">
                    {PRIV_LIST.map((p) => {
                      const checked = infoUser.privileges?.includes(p.id);
                      return (
                        <label className={`priv-item readonly`} key={p.id}>
                          <input type="checkbox" checked={!!checked} disabled />
                          <span className="edit-checkmark"></span>
                          <span className="priv-label">{p.label}</span>
                        </label>
                      );
                    })}
                  </div>
                ),
              }]
            : []
        ),
      ]}
    />
  )}
  <div className="modal-actions">
    <button className="btn-primary" onClick={closeInfo}>
      <Icon icon="mdi:check" /> Aceptar
    </button>
  </div>
</Modal>


      {/* EDITAR (Datos + Privilegios si es Consultante/Consultor) */}
      <Modal open={editOpen} title="Editar usuario" onClose={closeEdit}>
        {editUser && (
          <Tabs
            active={editTab}
            onChange={setEditTab}
            tabs={[
              {
                key: "datos",
                label: "Datos personales",
                icon: "mdi:account-edit-outline",
                content: (
                  <div className="modal-body modal-grid-2">
                    <Field label="ID" value={editUser.id} readOnly />
                    <Field
                      label="Rol"
                      as="select"
                      value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                    >
                      <option>Administrador</option>
                      <option>Usuario</option>
                      <option>Consultante</option>
                    </Field>
                    <Field
                      label="Nombre"
                      value={editUser.firstName}
                      onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                    />
                    <Field
                      label="Apellido"
                      value={editUser.lastName}
                      onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                    />
                    <Field
                      label="Estado"
                      as="select"
                      value={editUser.status}
                      onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                    >
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                    </Field>
                  </div>
                ),
              },
              // Tab de Privilegios SOLO si es Consultante/Consultor
              ...( ["Consultante","Consultor"].includes(editUser.role)
                ? [{
                    key: "priv",
                    label: "Privilegios",
                    icon: "mdi:shield-key-outline",
                    content: (
                      <div className="priv-list">
                        {PRIV_LIST.map((p) => {
                          const checked = editUser.privileges?.includes(p.id);
                          return (
                            <label className="priv-item" key={p.id}>
                              <input
                                type="checkbox"
                                checked={!!checked}
                                onChange={() => {
                                  const has = editUser.privileges?.includes(p.id);
                                  const next = has
                                    ? editUser.privileges.filter((x) => x !== p.id)
                                    : [...(editUser.privileges || []), p.id];
                                  setEditUser({ ...editUser, privileges: next });
                                }}
                              />
                              <span className="edit-checkmark"></span>
                              <span className="priv-label">{p.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    ),
                  }]
                : []
              )
            ]}
          />
        )}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={closeEdit}>Cancelar</button>
          <button className="btn-primary" onClick={saveEdit}>
            <Icon icon="mdi:content-save-outline" /> Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
}
