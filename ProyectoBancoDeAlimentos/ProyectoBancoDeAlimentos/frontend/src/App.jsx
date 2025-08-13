import "./App.css";
//import Header from "./components/Header";
//import Start from "./components/Start";
//import Error404 from "./components/Error404";
//<Route path="/" element={<Menu />} />
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
