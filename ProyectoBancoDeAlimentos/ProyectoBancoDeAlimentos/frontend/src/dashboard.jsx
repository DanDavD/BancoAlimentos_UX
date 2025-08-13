import "./dashboard.css";
import Sidebar from "./sidebar";
import React, { useState } from "react";
import grafica from "./images/Grafico_pastel_Admin.png";
import grafica1 from "./images/Grafico_Barras_Admin.png";
import donaciones from "./images/donaciones.png";
import beneficiarios from "./images/bf_atendidos.png";
import solicitudes from "./images/Solicitudes pendientes.png";

function Dashboard() {
  const [moveButton, setLeft] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = () => {
    setLeft(!moveButton);
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      {showSidebar && <Sidebar />}
      <button
        onClick={handleClick}
        className={`btn_sidebar ${moveButton ? "left-[180px]" : "left-2"}`}
      >
        <span className="material-symbols-outlined text-[42px] text-white">
          menu
        </span>
      </button>
      <div className="pl-32 pr-32">
        <div className="pt-5">
          <h1 className="font-roboto font-bold text-[#ffac77] text-5xl justify-center pb-1">
            Dashboard Administrador
          </h1>
          <hr className="bg-[#ffac77] h-[2px]"></hr>
        </div>

        <div className="grid grid-cols-2 md: grid-cols-3  w-full h-full gap-12 mt-4 items-stretch pt-5">
          <div className="sm_grid ">
            <img src={donaciones} className="object-cover w-22 h-16 pl-4"></img>
            <p className="pl-0">Total de donaciones este mes: 10,500 KG</p>
          </div>
          <div className="sm_grid">
            <img
              src={beneficiarios}
              className="object-cover w-22 h-16 pl-6"
            ></img>
            <p className="pl-4">
              Beneficiarios Atendidos:
              <br /> 4000
            </p>
          </div>
          <div className="sm_grid">
            <img
              src={solicitudes}
              className="object-cover w-22 h-22 pl-6"
            ></img>
            <p className="pl-4">
              Solicitudes pendientes:
              <br />
              13
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg: grid-cols-2 gap-6 mt-6 w-full h-full items-stretch">
          <div className="lg_grid">
            <img
              src={grafica}
              className="object-cover w-[450px] h-[380px] ml-[100px]"
            ></img>
          </div>
          <div className="lg_grid">
            <img
              src={grafica1}
              className="object-cover w-[450px] h-[380px] ml-[100px]"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
