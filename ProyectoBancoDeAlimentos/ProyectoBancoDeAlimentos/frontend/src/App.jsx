import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";
import Crear_cuenta from "./crear_cuenta.jsx";
import Forgot_password from "./forgot_password.jsx";
import Cambiar_contraseña from "./cambiar_contraseña.jsx";
import InicioUsuario from "./components/inicioUsuario.jsx"
function App() {
  return (
    <div className="App">
      <Header /> {}
      <Routes>
        <Route path="/" element={<InicioUsuario />} />
        <Route path="/crear_cuenta" element={<Crear_cuenta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<Forgot_password />} />
        <Route path="/cambiar_contraseña" element={<Cambiar_contraseña />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
