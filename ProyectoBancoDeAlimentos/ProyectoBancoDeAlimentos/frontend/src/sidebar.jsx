import React from "react";
import "./sidebar.css";
import logo from "./logo_sidebar.png";
import dashboard from "./Iconos_sidebar/Dashboard.png";
import bodega from "./Iconos_sidebar/Bodega.png";
import reportes from "./Iconos_sidebar/Reportes.png";
import mensajeria from "./Iconos_sidebar/Mensajeria.png";
import cerrar from "./Iconos_sidebar/Cerrar sesion.png";
import ingresarProducto from "./Iconos_sidebar/Ingresar Producto.png";
import ab_bodega from "./Iconos_sidebar/Abastecer Bodega.png";
import perfil from "./Iconos_sidebar/Vector.png";
import { useState } from "react";

const Sidebar = () => {
  const [show, showSubList] = useState(false);
  const handleClick = () => {
    showSubList(!show);
  };

  return (
    <div className="sidebar flex flex-col h-screen">
      <ul className="space-y-8 relative flex-1">
        <li className="pr-14">
          <img src={logo}></img>
        </li>
        <li>
          <a href="/user" className="sidebar_item gap-4">
            <img src={perfil} className="w-10 h-13 object-cover ml-2"></img>
            Mi Perfil
          </a>
        </li>
        <li>
          <a href="/dashboard" className="sidebar_item">
            <img src={dashboard} className="w-14 h-10 object-cover p-1"></img>
            Dashboard
          </a>
        </li>
        <li>
          <button onClick={handleClick} className="sidebar_item w-full">
            <img src={bodega} className="w-14 h-11 object-cover p-1"></img>
            Bodega
          </button>
          {show && (
            <ul className="px-2">
              <li className="sidebar_item ">
                <a href="/ingresar_producto" className="sidebar_item">
                  <img
                    src={ingresarProducto}
                    className="w-12 h-12 object-cover p-1"
                  ></img>
                  Ingresar producto
                </a>
              </li>
              <li className="sidebar_item ">
                <a href="/abastecer_bodega" className="sidebar_item">
                  <img
                    src={ab_bodega}
                    className="w-12 h-16 object-cover p-1"
                  ></img>
                  Abastecer Bodega
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="/reportes" className="sidebar_item">
            <img src={reportes} className="w-14 h-9 object-cover p-1"></img>
            Reportes
          </a>
        </li>
        <li>
          <a href="/mensajeria" className="sidebar_item">
            <img src={mensajeria} className="w-14 h-8 object-cover p-1"></img>
            Mensajeria
          </a>
        </li>
      </ul>
      <footer className="mt-auto">
        <a href="/" className="sidebar_item ">
          <img src={cerrar} className="w-14 h-12 object-cover p-1"></img>
          Cerrar Sesion
        </a>
      </footer>
    </div>
  );
};

export default Sidebar;
