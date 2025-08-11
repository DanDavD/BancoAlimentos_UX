import React from "react";
import "./Header.css";
import logo from "../logo.svg";

function Header() {
  return (
    //se tendria que cambiar el logo por el del banco de alimentos
    //de igual forma se tienen que cambiar los colores pero se esta
    // a la espera de que se definan los colores del banco de alimentos  y el diseno final

    <header className="header">
      <div className="header-content">
        <img src={logo} className="logo" />
      </div>
    </header>
  );
}

export default Header;
