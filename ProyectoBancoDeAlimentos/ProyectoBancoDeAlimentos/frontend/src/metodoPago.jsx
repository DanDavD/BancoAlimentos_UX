import React, { useState } from "react";
import "./metodoPago.css";
import PerfilSidebar from "./components/perfilSidebar";

export default function MetodoPago() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="metodo-pago">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <div className="agregar-tarjeta-container">
        <h1 className="titulo-pago">Pago</h1>
        <hr className="separador" />

        {/* Estado: sin tarjeta */}
        {!showForm && (
          <div className="contenedor-tarjeta">
            <button onClick={() => setShowForm(true)} className="btn-anadir">
              + Añadir nueva tarjeta
            </button>
            <p className="texto-info">Aún no has guardado ninguna tarjeta.</p>
          </div>
        )}
      </div>

      {/* Estado: formulario */}
      {showForm && (
        <div className="contenedor-formulario">
          <div className="imagenes-tarjeta">
            <img src="/images/card-front.png" alt="Tarjeta frontal" />
            <img src="/images/card-back.png" alt="Tarjeta trasera" />
          </div>

          <form className="form-tarjeta">
            <div className="campo">
              <label>Número de la tarjeta</label>
              <input type="text" placeholder="0000 0000 0000 0000" />
            </div>

            <div className="fila">
              <div className="campo">
                <label>Nombre</label>
                <input type="text" placeholder="Ej: Diego" />
              </div>
              <div className="campo">
                <label>Apellido</label>
                <input type="text" placeholder="Ej: Matute Lora" />
              </div>
            </div>

            <div className="fila">
              <div className="campo">
                <label>Fecha de vencimiento</label>
                <input type="text" placeholder="MM/AA" />
              </div>
              <div className="campo">
                <label>CVV</label>
                <input type="text" placeholder="000" />
              </div>
            </div>

            <div className="botones">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-guardar">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Información de seguridad */}
      <div className="info-seguridad">
        <img className="seguro" src="./secure.png" alt="seguro" />
        <p>
          <b>Easy Way</b> protege tu información de pago
        </p>
        <ul>
          <li>✔ Seguimos el estándar PCI DSS al entregar datos de tarjeta</li>
          <li>✔ Toda la información permanece segura y sin compromisos</li>
          <li>✔ Todos los datos están encriptados</li>
          <li>✔ Nunca se manipularán ni venderán tus datos</li>
        </ul>
      </div>
    </div>
  );
}
