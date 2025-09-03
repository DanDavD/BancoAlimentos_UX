import React from "react";
import "./sidebar.css";
import logo from "./images/logo-easyway.png";
import { useState } from "react";

const Sidebar = () => {
  const [show, showSubList] = useState(false);
  const handleClick = () => {
    showSubList(!show);
  };

  return (
    <div className="sidebar flex flex-col h-screen">
      <img src={logo} className="w-40 h-12 object-cover ml-4 my-4"></img>
      <hr className="bg-white h-[2px] mt-1"></hr>
      <a href="/user" className="perfil">
        <span className="material-symbols-outlined text-[42px] text-white">
          person
        </span>
        Mi Perfil
      </a>
      <hr className="bg-white h-[2px] mb-2"></hr>
      <ul className="space-y-4 relative flex flex-col pt-1">
        <li>
          <a href="/dashboard" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              finance_mode
            </span>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/Inventario" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              package_2
            </span>
            Gestion de
            <br />
            Inventario
          </a>
        </li>
        <li>
          <a href="/gestionProductos" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              assignment
            </span>
            Gestion de
            <br />
            Productos
          </a>
        </li>
        <li>
          <a href="/mensajeria" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              percent_discount
            </span>
            Promociones y descuentos
          </a>
        </li>
        <li>
          <a href="/mensajeria" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              groups
            </span>
            Gestion de <br />
            Usuarios
          </a>
        </li>
        <li>
          <a href="/mensajeria" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              clinical_notes
            </span>
            Reportes
          </a>
        </li>
        <li>
          <a href="/mensajeria" className="sidebar_item">
            <span className="material-symbols-outlined text-[42px] text-white">
              settings
            </span>
            Configuracion
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
