import { useState, useEffect } from "react";
import "./misPedidos.css";
import calendarIcon from "./images/calendar.png";
import PedidoEmergente from "./components/pedidoEmergente";
import PerfilSidebar from "./components/perfilSidebar";
import { getHistorialComprasProductos } from "./api/PedidoApi"; // Asegúrate de que la ruta sea correcta

const MisPedidos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("recientes");
  const [fechaExacta, setFechaExacta] = useState("");
  const [limite, setLimite] = useState(10);
  const [pedidos, setPedidos] = useState([]); // Estado para los pedidos de la API
  const [cargando, setCargando] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    // Llamada a la API al cargar el componente
    const fetchPedidos = async () => {
      try {
        const response = await getHistorialComprasProductos();
        // Mapea la data de la API para que coincida con la estructura del frontend
        const pedidosFormateados = response.data.map(item => ({
          id: item.id_pedido,
          fecha: item.fecha_pedido.split('T')[0], // Formato YYYY-MM-DD
          estado: item.estado_pedido, // Asume que la API devuelve 'En curso' o 'Entregado'
          productos: [] // Los detalles de productos se obtendrán al abrir el modal
        }));
        setPedidos(pedidosFormateados);
        setCargando(false);
      } catch (err) {
        setError("No se pudo cargar el historial de pedidos.");
        setCargando(false);
        console.error("Error al obtener pedidos:", err);
      }
    };
    fetchPedidos();
  }, []);

  // Aplicar filtro
  let pedidosFiltrados = [...pedidos];

  if (filtro === "recientes") {
    pedidosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  } else if (filtro === "antiguos") {
    pedidosFiltrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  } else if (filtro === "exacta" && fechaExacta) {
    pedidosFiltrados = pedidosFiltrados.filter((p) => p.fecha === fechaExacta);
  }

  // Limitar a 10 (o más si se presiona "Ver más")
  const pedidosMostrados = pedidosFiltrados.slice(0, limite);

  const abrirModal = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setPedidoSeleccionado(null);
    setModalAbierto(false);
  };

  return (
    <div className="mis-pedidos-container">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <div className="content-wrapper">
        <div className="main-content">
          <h2 className="historial-title">Historial de pedidos</h2>
          <hr className="perfil-separator" />

          <div className="historial-box">
            <div className="historial-header">
              <h3>Historial de pedidos</h3>
              <select
                className="filtro-fecha"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="recientes">Más recientes</option>
                <option value="antiguos">Más antiguos</option>
                <option value="exacta">Fecha exacta</option>
              </select>
              {filtro === "exacta" && (
                <input
                  type="date"
                  value={fechaExacta}
                  onChange={(e) => setFechaExacta(e.target.value)}
                />
              )}
              <img
                src={calendarIcon}
                alt="Calendario"
                className="icono-calendario"
              />
            </div>

            <div className="historial-list">
              {cargando && <p>Cargando historial...</p>}
              {error && <p className="error-message">{error}</p>}
              {!cargando && !error && pedidosMostrados.length === 0 && <p>No se encontraron pedidos.</p>}
              {!cargando && !error && pedidosMostrados.map((pedido) => (
                <div key={pedido.id} className="pedido-item">
                  <div
                    className="pedido-info clickable"
                    onClick={() => abrirModal(pedido)}
                  >
                    <p className="pedido-id">Pedido #{pedido.id}</p>
                    <p className="pedido-fecha">{pedido.fecha}</p>
                  </div>
                  <span
                    className={`pedido-estado ${
                      pedido.estado === "En curso" ? "en-curso" : "entregado"
                    }`}
                  >
                    {pedido.estado}
                  </span>
                </div>
              ))}
            </div>

            {limite < pedidosFiltrados.length && (
              <div className="ver-mas-container">
                <button
                  className="btn-ver-mas"
                  onClick={() => setLimite(limite + 10)}
                >
                  Ver más
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalAbierto && pedidoSeleccionado && (
        <PedidoEmergente
          pedido={pedidoSeleccionado}
          cerrarModal={cerrarModal}
        />
      )}
    </div>
  );
};

export default MisPedidos;