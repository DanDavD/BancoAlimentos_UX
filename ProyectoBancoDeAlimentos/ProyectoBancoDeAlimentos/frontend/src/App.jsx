import "./App.css";
//import Header from "./components/Header";
//import Start from "./components/Start";
//import Error404 from "./components/Error404";
//<Route path="/" element={<Menu />} />
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";
import Crear_cuenta from "./crear_cuenta.jsx";
import Forgot_password from "./forgot_password.jsx";
import Cambiar_contraseña from "./cambiar_contraseña.jsx";
import Header from "./components/Header";
import InicioUsuario from "./components/inicioUsuario.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <InicioUsuario />
    </div>
  );
}

export default App;
