import { useState, useEffect } from "react";
import { GetALLCupones } from "./api/CuponesApi";
import "./misCupones.css";
import PerfilSidebar from "./components/perfilSidebar";

const MisCupones = () => {
  const [cuponesNoUtilizados, setCuponesNoUtilizados] = useState([]);
  const [cuponesUsados, setCuponesUsados] = useState([]);
  const [cuponesCaducados, setCuponesCaducados] = useState([]);
  const [cuponesMostrados, setCuponesMostrados] = useState([]);

  const usuarioActivo = localStorage.getItem("id_usuario");

  useEffect(() => {
    if (!usuarioActivo) return;

    GetALLCupones(usuarioActivo)
      .then(res => {
        const hoy = new Date();
        hoy.setHours(0,0,0,0);

        const noUsados = res.filter(c => c.fecha_usado === null && c.activo);
        const usados = res.filter(c => c.fecha_usado !== null && new Date(c.fecha_usado) < hoy && c.activo);
        const caducados = res.filter(c => !c.activo || (c.fecha_usado !== null && new Date(c.fecha_usado) < hoy));

        setCuponesNoUtilizados(noUsados);
        setCuponesUsados(usados);
        setCuponesCaducados(caducados);
        setCuponesMostrados(noUsados);
      })
      .catch(err => console.error("Error al traer los cupones:", err));
  }, [usuarioActivo]);

  const mostrarCupones = (tipo) => {
    if (tipo === "Cupones no utilizados") setCuponesMostrados(cuponesNoUtilizados);
    else if (tipo === "Usados") setCuponesMostrados(cuponesUsados);
    else setCuponesMostrados(cuponesCaducados);
  };

  return (
    <div className="cupones">

    <section className="sidebar">
        <PerfilSidebar />
      </section>

      <div className="titulo">
        <p className="titulo_texto">Mis cupones</p>
        <hr className="linea"></hr>
      </div>

      <div className="titulos_secundarios">
        <p onClick={() => mostrarCupones("Cupones no utilizados")}>Cupones no utilizados</p>
        <p onClick={() => mostrarCupones("Usados")}>Usados</p>
        <p onClick={() => mostrarCupones("Cupones caducados")}>Cupones caducados</p>
      </div>

      <div className="cupones_reporte">
        <div className="lista_reportes">
          {cuponesMostrados.length === 0 ? (
            <p>No hay cupones en esta categoría</p>
          ) : (
            cuponesMostrados.map((cupon) => (
              <div key={cupon.codigo} className="cupones_categoria">
                <button className="boton_cupon">
                  <span className="texto_cupon1">{cupon.codigo}</span>
                  <br />
                  {cupon.descripcion}
                  <br /><br />
                  <span className="texto_cupon2">
                    {cupon.fecha_usado ? `Usado el: ${cupon.fecha_usado}` : `Vence el: ${cupon.termina_en || "N/A"}`}
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MisCupones;