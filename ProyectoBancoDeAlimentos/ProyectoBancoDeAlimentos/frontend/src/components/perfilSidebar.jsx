import { Link } from "react-router-dom";

export default function PerfilSidebar() {
  const sidebarStyle = {
    width: "250px",
    height: "100vh", // ocupa toda la altura
    position: "sticky", // se queda fijo
    top: "0", // pegado arriba
    background: "#fff",
    borderRight: "1px solid #ddd",
    padding: "1rem", // equivalente a p-4
  };

  return (
    <div className="w-64 bg-white shadow-md h-full p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Mi cuenta</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/miPerfil"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Editar perfil
          </Link>
        </li>
        <li>
          <Link
            to="/misPedidos"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Mis Pedidos
          </Link>
        </li>
        <li>
          <Link
            to="/metodoPago"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Métodos de pago
          </Link>
        </li>
        <li>
          <Link
            to="/lista-deseos"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Lista de deseos
          </Link>
        </li>
        <li>
          <Link
            to="/mis-direcciones"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Mis direcciones
          </Link>
        </li>
        <li>
          <Link
            to="/mis-cupones"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Mis cupones
          </Link>
        </li>
        <li>
          <Link
            to="/mis-facturas"
            className="block p-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Mis facturas
          </Link>
        </li>
      </ul>
    </div>
  );
}
