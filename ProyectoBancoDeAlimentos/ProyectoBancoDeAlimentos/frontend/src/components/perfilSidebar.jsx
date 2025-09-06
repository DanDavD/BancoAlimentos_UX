import { Link } from "react-router-dom";
export default function PerfilSidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4 rounded-xl fixed h-screen ">
      <h2 className="text-lg font-semibold mb-4">Mi cuenta</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/miPerfil"
            className="block p-2 rounded hover:bg-[#f0833e] text-gray-700"
          >
            Editar perfil
          </Link>
        </li>
        <li>
          <Link
            to="/misPedidos"
            className="block p-2 rounded hover:bg-[#f0833e] text-gray-700"
          >
            Mis Pedidos
          </Link>
        </li>
        <li>
          <Link
            to="/metodoPago"
            className="block p-2 rounded hover:bg-[#f0833e] text-gray-700"
          >
            Métodos de pago
          </Link>
        </li>

        <li>
          <Link
            to="/misDirecciones"
            className="block p-2 rounded hover:bg-[#f0833e] text-gray-700"
          >
            Mis direcciones
          </Link>
        </li>
        <li>
          <Link
            to="/misCupones"
            className="block p-2 rounded hover:bg-[#f0833e] text-gray-700"
          >
            Mis cupones
          </Link>
        </li>
        <li>
          <Link
            to="/mis-facturas"
            className="block p-2 rounded hover:bg-[#f0833e] text-gray-700"
          >
            Mis facturas
          </Link>
        </li>
      </ul>
    </div>
  );
}
