import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";
import Crear_cuenta from "./crear_cuenta.jsx";
import Forgot_password from "./forgot_password.jsx";
import Cambiar_contraseña from "./cambiar_contraseña.jsx";
import InicioUsuario from "./components/inicioUsuario.jsx";
import InicioAdmin from "./components/inicioAdmin.jsx";
import GestionProductos from "./gestionProductos.jsx";
import Headerr from "./components/Headerr";
import Inventario from "./pages/Inventario.jsx";
import EditarPerfilAdmin from "./pages/EditMiPerfil.jsx";
//import Histo from "./pages/HistorialPedido.jsx";
const HEADER_HEIGHT = 144; // px

function App() {
  return (
    <div className="App">
      <Headerr />

      <div style={{ marginTop: `${HEADER_HEIGHT}px` }}>
        <Routes>
          <Route path="/" element={<InicioUsuario />} />
          <Route path="/crear_cuenta" element={<Crear_cuenta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot_password" element={<Forgot_password />} />
          <Route path="/cambiar_contraseña" element={<Cambiar_contraseña />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gestionProductos" element={<GestionProductos />} />
          <Route path="/inicioAdmin" element={<InicioAdmin />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/EditarPerfilAdmin" element={<EditarPerfilAdmin />} />
          
        </Routes>
      </div>
    </div>
  );
}
//<Route path="/Histo" element={<Histo />} />
export default App;
