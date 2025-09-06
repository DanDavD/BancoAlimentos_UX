// misCupones.jsx
import { useState } from "react";
import "./misCupones.css";

const MisCupones = () => {
  const cuponesNoUtilizados = [
    { id: 1, descuento: "15% DE DESCUENTO", pedidos: 29, expira: "23/11/2025" },
    { id: 2, descuento: "10% DE DESCUENTO", pedidos: 10, expira: "30/09/2025" },
    { id: 3, descuento: "15% DE DESCUENTO", pedidos: 29, expira: "23/11/2025" },
    { id: 4, descuento: "10% DE DESCUENTO", pedidos: 10, expira: "30/09/2025" },
    { id: 5, descuento: "15% DE DESCUENTO", pedidos: 29, expira: "23/11/2025" },
    { id: 6, descuento: "10% DE DESCUENTO", pedidos: 10, expira: "30/09/2025" },
    { id: 7, descuento: "15% DE DESCUENTO", pedidos: 29, expira: "23/11/2025" },
    { id: 8, descuento: "10% DE DESCUENTO", pedidos: 10, expira: "30/09/2025" },
    { id: 9, descuento: "15% DE DESCUENTO", pedidos: 29, expira: "23/11/2025" },
    {
      id: 10,
      descuento: "10% DE DESCUENTO",
      pedidos: 10,
      expira: "30/09/2025",
    },
  ];

  const cuponesUsados = [
    { id: 3, descuento: "5% DE DESCUENTO", pedidos: 5, expira: "15/08/2025" },
  ];

  const cuponesCaducados = [
    { id: 4, descuento: "20% DE DESCUENTO", pedidos: 50, expira: "01/01/2025" },
  ];

  const [cuponesMostrados, setCuponesMostrados] = useState(cuponesNoUtilizados);

  const mostrarCupones = (tipo) => {
    if (tipo === "Cupones no utilizados") {
      setCuponesMostrados(cuponesNoUtilizados);
    } else if (tipo === "Usados") {
      setCuponesMostrados(cuponesUsados);
    } else {
      setCuponesMostrados(cuponesCaducados);
    }
  };

  return (
    <div className="cupones">
      <div className="titulo">
        <p className="titulo_texto">Mis cupones</p>
        <hr className="linea"></hr>
      </div>

      <div className="titulos_secundarios">
        <p onClick={() => mostrarCupones("Cupones no utilizados")}>
          Cupones no utilizados
        </p>
        <p onClick={() => mostrarCupones("Usados")}>Usados</p>
        <p onClick={() => mostrarCupones("Cupones caducados")}>
          Cupones caducados
        </p>
      </div>

      <div className="cupones_reporte">
        <div className="lista_reportes">
          {cuponesMostrados.map((cupon) => (
            <div key={cupon.id} className="cupones_categoria">
              <button className="boton_cupon">
                <span className="texto_cupon1">{cupon.descuento}</span>
                <br />
                Pedidos +{cupon.pedidos}
                <br />
                <br />
                <span className="texto_cupon2">Expira el: {cupon.expira}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisCupones;
