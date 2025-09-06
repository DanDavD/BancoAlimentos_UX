import React, { useMemo, useEffect, useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Plus,
} from "lucide-react";
import "./UserManagementViews.css";

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {"Administrador"|"Usuario"} role
 * @property {"ACTIVO"|"INACTIVO"} status
 * @property {number} avgSpendLps
 * @property {string} frequency
 * @property {string} favorite
 * @property {string} joinDate
 */

const SEED_USERS /** @type {User[]} */ = [
  {
    id: "001",
    firstName: "Harold",
    lastName: "Dias",
    role: "Administrador",
    status: "ACTIVO",
    avgSpendLps: 2300,
    frequency: "4 veces por mes",
    favorite: "Café",
    joinDate: "03/05/2024",
  },
  {
    id: "002",
    firstName: "Elisa",
    lastName: "Paz",
    role: "Usuario",
    status: "ACTIVO",
    avgSpendLps: 15000.1,
    frequency: "5 veces por mes",
    favorite: "Manzanas",
    joinDate: "12/08/2025",
  },
  {
    id: "003",
    firstName: "Rene",
    lastName: "Reyes",
    role: "Administrador",
    status: "ACTIVO",
    avgSpendLps: 5200,
    frequency: "3 veces por mes",
    favorite: "Leche",
    joinDate: "22/11/2024",
  },
  {
    id: "004",
    firstName: "Harold",
    lastName: "Juanse",
    role: "Usuario",
    status: "ACTIVO",
    avgSpendLps: 1800,
    frequency: "2 veces por mes",
    favorite: "Galletas",
    joinDate: "09/01/2025",
  },
  {
    id: "005",
    firstName: "Elisa",
    lastName: "Oliva",
    role: "Administrador",
    status: "ACTIVO",
    avgSpendLps: 9800,
    frequency: "6 veces por mes",
    favorite: "Cereal",
    joinDate: "28/02/2025",
  },
  {
    id: "006",
    firstName: "Juan",
    lastName: "Perez",
    role: "Administrador",
    status: "ACTIVO",
    avgSpendLps: 4200,
    frequency: "1 vez por mes",
    favorite: "Refresco",
    joinDate: "13/03/2025",
  },
  {
    id: "007",
    firstName: "Hernan",
    lastName: "Soler",
    role: "Usuario",
    status: "INACTIVO",
    avgSpendLps: 0,
    frequency: "-",
    favorite: "-",
    joinDate: "01/04/2025",
  },
];

const StatusBadge = ({ value }) => (
  <span
    className={"status-badge " + (value === "ACTIVO" ? "activo" : "inactivo")}
  >
    {value}
  </span>
);

const RolePill = ({ role }) => <span className="role-pill">{role}</span>;

const Modal = ({ open, title, children }) => {
  if (!open) return null;
  return (
    <div className="form-modal">
      <div className="form-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

function Field({
  label,
  value,
  onChange,
  readOnly,
  as = "input",
  children,
  placeholder,
}) {
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

export default function UserManagementViews() {
  const [users, setUsers] = useState(SEED_USERS);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [infoUser, setInfoUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Crear usuario
  const [createOpen, setCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    role: "Usuario",
    status: "ACTIVO",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.id, u.firstName, u.lastName, u.role, u.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const visible = filtered.slice(
    (pageSafe - 1) * pageSize,
    pageSafe * pageSize
  );

  const removeUser = (id) => {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    if (
      window.confirm(
        `¿Estás segura que deseas eliminar a ${u.firstName} ${u.lastName}?`
      )
    ) {
      setUsers((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const openInfo = (u) => setInfoUser(u);
  const closeInfo = () => setInfoUser(null);

  const openEdit = (u) => setEditUser({ ...u });
  const closeEdit = () => setEditUser(null);
  const saveEdit = () => {
    if (!editUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? { ...u, ...editUser } : u))
    );
    closeEdit();
  };

  const formatLps = (n) =>
    `L. ${n.toLocaleString("es-HN", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;

  // Helpers crear usuario
  const nextId = () => {
    const max = users.reduce((m, u) => Math.max(m, parseInt(u.id, 10)), 0);
    return String(max + 1).padStart(3, "0");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [privilegios, setPrivilegios] = useState([
    { id: 1, label: "Privilegio 1", checked: false },
    { id: 2, label: "Privilegio 2", checked: false },
    { id: 3, label: "Privilegio 3", checked: false },
    { id: 4, label: "Privilegio 4", checked: false },
    { id: 5, label: "Privilegio 5", checked: false },
    { id: 6, label: "Privilegio 6", checked: false },
  ]);

  const handleClosePrivileges = () => {
    setIsOpen(false);
    setPrivilegios((prev) => prev.map((p) => ({ ...p, checked: false })));
  };

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setPrivilegios((prev) => prev.map((p) => ({ ...p, checked: false })));
    }
  }, [isOpen]);

  const handleCreate = () => {
    const { firstName, lastName, role, status } = newUser;
    if (!firstName.trim() || !lastName.trim()) {
      return alert("Nombre y Apellido son obligatorios.");
    }
    const user = {
      id: nextId(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role,
      status,
      avgSpendLps: 0,
      frequency: "-",
      favorite: "-",
      joinDate: new Date().toLocaleDateString("es-HN"),
    };
    if (role === "Consultante") {
      setIsOpen(true);
    }
    setUsers((prev) => [...prev, user]);
    setCreateOpen(false);
    setNewUser({
      firstName: "",
      lastName: "",
      role: "Consultante",
      status: "ACTIVO",
    });
    // Ir a la última página para ver el nuevo
    const total = filtered.length + 1;
    const newTotalPages = Math.max(1, Math.ceil(total / pageSize));
    setPage(newTotalPages);
  };

  const [showPagination, setShowPagination] = useState(false);
  const [privilagePagination, setPrivilagePagination] = useState(false);

  const editRoleChange = (e) => {
    const selectedRole = e.target.value;
    setNewUser({ ...newUser, role: selectedRole });

    if (selectedRole === "Consultante") {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <header className="page-header">
          <h1>
            <span className="accent">Gestión Perfil De Usuarios</span>
          </h1>

          <button className="btn-primary" onClick={() => setCreateOpen(true)}>
            <Plus className="h-5 w-5" />
            <span>Crear Usuario</span>
          </button>
        </header>

        <div className="search-bar">
          <div className="search-input">
            <Search className="search-icon" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar Usuario"
            />
          </div>

          <div className="user-count">
            <span>Usuarios registrados:</span>
            <span className="count-bubble">{filtered.length}</span>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Estado</th>
                <th>Rol</th>
                <th style={{ textAlign: "center" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>
                    <StatusBadge value={u.status} />
                  </td>
                  <td>
                    <RolePill role={u.role} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div
                      className="action-buttons"
                      style={{ justifyContent: "center" }}
                    >
                      <button
                        onClick={() => openInfo(u)}
                        aria-label="Información"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button onClick={() => openEdit(u)} aria-label="Editar">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeUser(u.id)}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No hay resultados para "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={n === pageSafe ? "active" : ""}
              aria-label={`Ir a página ${n}`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageSafe === totalPages}
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </main>

      {/* INFO */}
      <Modal open={!!infoUser} title="Información">
        {infoUser && (
          <div className="modal-body">
            <Field label="ID del usuario" value={infoUser.id} readOnly />
            <Field label="Rol" value={infoUser.role} readOnly />
            <Field
              label="Monto promedio por compra"
              value={formatLps(infoUser.avgSpendLps)}
              readOnly
            />
            <Field
              label="Frecuencia de compra"
              value={infoUser.frequency}
              readOnly
            />
            <Field
              label="Producto favorito"
              value={infoUser.favorite}
              readOnly
            />
            <Field
              label="Fecha de Ingreso"
              value={infoUser.joinDate}
              readOnly
            />
          </div>
        )}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={closeInfo}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={closeInfo}>
            <Check className="h-5 w-5" />
            Confirmar
          </button>
        </div>
      </Modal>

      {/* EDITAR */}
      <Modal
        open={!!editUser}
        title={privilagePagination ? "Editar Privilegios" : "Editar Usuario"}
        className={privilagePagination ? "edit-form-modal" : ""}
      >
        {/* Contenido variable */}
        <div
          className={privilagePagination ? "edit-form-content" : "modal-body"}
        >
          {!privilagePagination && editUser && (
            <>
              <Field label="ID" value={editUser.id} readOnly />
              <Field
                label="Rol"
                as="select"
                value={newUser.role}
                onChange={editRoleChange}
              >
                <option>Administrador</option>
                <option>Usuario</option>
                <option>Consultante</option>
              </Field>
              <Field
                label="Nombre"
                value={editUser.firstName}
                onChange={(e) =>
                  setEditUser({ ...editUser, firstName: e.target.value })
                }
                placeholder="Nombre"
              />
              <Field
                label="Apellido"
                value={editUser.lastName}
                onChange={(e) =>
                  setEditUser({ ...editUser, lastName: e.target.value })
                }
                placeholder="Apellido"
              />
              <Field
                label="Estado"
                as="select"
                value={editUser.status}
                onChange={(e) =>
                  setEditUser({ ...editUser, status: e.target.value })
                }
              >
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </Field>
            </>
          )}

          {privilagePagination && (
            <div className="edit-privileges-container">
              {privilegios.map((p, i) => (
                <React.Fragment key={p.id}>
                  <hr className="edit-line" />
                  <div className="edit-privilege-item">
                    <span className="edit-privilege-label">{p.label}</span>
                    <label className="edit-checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={p.checked}
                        onChange={(e) => {
                          const updated = [...privilegios];
                          updated[i].checked = e.target.checked;
                          setPrivilegios(updated);
                        }}
                      />
                      <span className="edit-checkmark"></span>
                    </label>
                  </div>
                </React.Fragment>
              ))}
              <hr className="edit-line" />
            </div>
          )}
        </div>

        {/* Paginación */}
        {showPagination && (
          <div className="pagination">
            {[1, 2].map((n) => (
              <button
                key={n}
                onClick={() => setPrivilagePagination(n === 2)}
                className={n === (privilagePagination ? 2 : 1) ? "active" : ""}
                aria-label={`Ir a página ${n}`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {/* Botones fijos */}
        <div className="modal-actions">
          <button
            className="btn-secondary"
            onClick={() => {
              handleClosePrivileges();
              closeEdit();
            }}
          >
            Cancelar
          </button>
          <button className="btn-primary" onClick={saveEdit}>
            Guardar
          </button>
        </div>
      </Modal>

      {/* CREAR */}
      <Modal open={createOpen} title="Crear usuario">
        <div className="modal-body">
          <Field
            label="Nombre"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            placeholder="Nombre"
          />
          <Field
            label="Apellido"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            placeholder="Apellido"
          />
          <Field
            label="Rol"
            as="select"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option>Usuario</option>
            <option>Administrador</option>
            <option>Consultante</option>
          </Field>
          <Field
            label="Estado"
            as="select"
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </Field>
        </div>
        <div className="modal-actions">
          <button
            className="btn-secondary"
            onClick={() => setCreateOpen(false)}
          >
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleCreate}>
            <Plus className="h-5 w-5" />
            Crear
          </button>
        </div>
      </Modal>

      {/* FORM DE PRIVILEGIOS */}
      {isOpen && (
        <div className="form-modal">
          <div className="form-content">
            <div className="modal-header">
              <h2 className="privilege-title">Privilegios</h2>
            </div>
            <div
              className="priviliges"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {privilegios.map((p, i) => (
                <React.Fragment key={p.id}>
                  <hr className="edit-line" />
                  <div className="edit-privilege-item">
                    <span className="edit-privilege-label">{p.label}</span>
                    <label className="edit-checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={p.checked}
                        onChange={(e) => {
                          const updated = [...privilegios];
                          updated[i].checked = e.target.checked;
                          setPrivilegios(updated);
                        }}
                      />
                      <span className="edit-checkmark"></span>
                    </label>
                  </div>
                </React.Fragment>
              ))}
              <hr className="linea" />
            </div>
            <div className="form-actions">
              <button
                className="btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
              <button className="btn-primary" onClick={() => setIsOpen(false)}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
