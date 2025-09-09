// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";
import Crear_cuenta from "./crear_cuenta.jsx";
import ForgotPassword from "./forgot_password.jsx";
import Cambiar_contraseña from "./cambiar_contraseña.jsx";
import InicioUsuario from "./components/inicioUsuario.jsx";
import InicioAdmin from "./components/inicioAdmin.jsx";
import GestionProductos from "./gestionProductos.jsx";
import Headerr from "./components/Headerr";
import Inventario from "./pages/Inventario.jsx";
import EditarPerfilAdmin from "./pages/EditMiPerfil.jsx";
import MiPerfil from "./miPerfil.jsx";
import MisPedidos from "./misPedidos.jsx";
import PedidoEmergente from "./components/pedidoEmergente.jsx";
import MetodoPago from "./metodoPago.jsx";
import TestAuth from "./pages/PruebaDeRoutes.jsx";
import HistorialPedido from "./pages/HistorialPedido.jsx";
import MisDirecciones from "./misDirecciones.jsx";
import AgregarCarrito from "./components/agregarCarrito.jsx";
import CompararProducto from "./components/compararProducto.jsx";
import UserManagementViews from "./UserManagementViews.jsx";
import MisCupones from "./misCupones.jsx";
import Verificacion from "./components/verificacion.jsx";
import CampanaPromocional from "./components/campanaPromocional.jsx";
import Carrito from "./carrito.jsx";
import VerificarCodigoAuth from "./verificarCofigoAthenticador.jsx";
import VerificarCodigo from "./verificarcodigo.jsx";
import { UserProvider } from "./components/userContext";
import DetalleFactura from "./pages/DetalleFactura.js";
import Facturas from "./pages/Facturas.js";
import NotFoundpage from "./notFoundPage.jsx";
import TablaVentas from "./tablaReportesVentas.jsx";
const HEADER_HEIGHT = 144;// px

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Headerr />

        <div style={{ marginTop: `${HEADER_HEIGHT}px` }}>
          <Routes>
            <Route path="/" element={<InicioUsuario />} />
            <Route path="/crear_cuenta" element={<Crear_cuenta />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route
              path="/cambiar_contraseña"
              element={<Cambiar_contraseña />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gestionProductos" element={<GestionProductos />} />
            <Route path="/inicio" element={<InicioAdmin />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/EditarPerfilAdmin" element={<EditarPerfilAdmin />} />
            <Route path="/miPerfil" element={<MiPerfil />} />
            <Route path="/misPedidos" element={<MisPedidos />} />
            <Route path="/pedidoEmergente" element={<PedidoEmergente />} />
            <Route path="/misDirecciones" element={<MisDirecciones />} />
            <Route path="/metodoPago" element={<MetodoPago />} />
            <Route path="/Prueba" element={<TestAuth />} />
            <Route path="/producto/:id" element={<AgregarCarrito />} />
            <Route
              path="/compararProductos/:id1/:id2"
              element={<CompararProducto />}
            />
            <Route path="/historialPedidos" element={<HistorialPedido />} />
            <Route path="/misCupones" element={<MisCupones />} />
            <Route path="/verificar-codigo" element={<VerificarCodigo />} />
            <Route
              path="/userManagementViews"
              element={<UserManagementViews />}
            />
            <Route path="/verificacion" element={<Verificacion />} />
            <Route
              path="/campanaPromocional"
              element={<CampanaPromocional />}
            />
            <Route path="/carrito" element={<Carrito />} />
            <Route
              path="/verificar-codigoAuth"
              element={<VerificarCodigoAuth />}
            />
            <Route path="/facturas" element={<Facturas />} />
            <Route path="/factura/:id" element={<DetalleFactura />} />
            <Route path="/tablaVentas" element={<TablaVentas />} />

            <Route path="*" element={<NotFoundpage />} />

          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
