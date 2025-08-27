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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/crear_cuenta" element={<Crear_cuenta />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot_password" element={<Forgot_password />}></Route>
      <Route
        path="/cambiar_contraseña"
        element={<Cambiar_contraseña />}
      ></Route>
    </Routes>
  );
}

export default App;
