import React, { useState, useEffect } from "react";
import "./metodoPago.css";
import PerfilSidebar from "./components/perfilSidebar";
import { getAllMetodoPago, createMetodoPago, deleteMetodoPago, setMetodoPagoDefault } from "./api/metodoPagoApi";

export default function MetodoPago() {
  const [showForm, setShowForm] = useState(false);
  const [metodosPago, setMetodosPago] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    numero_tarjeta: "",
    nombre: "",
    apellido: "",
    vencimiento_mes: "",
    vencimiento_ano: "",
    cvv: ""
  });

  // Cargar métodos de pago al montar el componente
  useEffect(() => {
    cargarMetodosPago();
  }, []);

  const cargarMetodosPago = async () => {
    try {
      setCargando(true);
      const response = await getAllMetodoPago();
      setMetodosPago(response.data);
    } catch (error) {
      console.error('Error al cargar métodos de pago:', error);
      setError('No se pudieron cargar los métodos de pago');
    } finally {
      setCargando(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear número de tarjeta con espacios cada 4 dígitos
    if (name === "numero_tarjeta") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setFormData({
        ...formData,
        [name]: formattedValue
      });
      return;
    }
    
    // Separar mes y año de la fecha de vencimiento
    if (name === "vencimiento") {
      const [mes, ano] = value.split("/");
      setFormData({
        ...formData,
        vencimiento_mes: mes || "",
        vencimiento_ano: ano || ""
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      // Preparar datos para la API según el modelo esperado
      const numeroTarjetaLimpio = formData.numero_tarjeta.replace(/\s/g, "");
      const payload = {
        token_pago: generarTokenSimulado(numeroTarjetaLimpio), // En producción usarías una pasarela real
        brand_tarjeta: determinarMarcaTarjeta(numeroTarjetaLimpio),
        tarjeta_ultimo: numeroTarjetaLimpio.slice(-4),
        vencimiento_mes: formData.vencimiento_mes,
        vencimiento_ano: formData.vencimiento_ano,
        nombre_en_tarjeta: `${formData.nombre} ${formData.apellido}`,
        id_direccion_facturacion: "no se guardo",
        metodo_predeterminado: false
      };

      await createMetodoPago(payload);
      setShowForm(false);
      setFormData({
        numero_tarjeta: "",
        nombre: "",
        apellido: "",
        vencimiento_mes: "",
        vencimiento_ano: "",
        cvv: ""
      });
      cargarMetodosPago(); // Recargar la lista
    } catch (error) {
      console.error('Error al agregar método de pago:', error);
      setError('Error al agregar el método de pago');
    }
  };

  // Función simulada para generar token (en producción usar una pasarela de pago real)
  const generarTokenSimulado = (numeroTarjeta) => {
    return `tok_${numeroTarjeta.slice(-8)}_${Date.now()}`;
  };

  const determinarMarcaTarjeta = (numero) => {
    if (/^4/.test(numero)) return 'Visa';
    if (/^5[1-5]/.test(numero)) return 'Mastercard';
    if (/^3[47]/.test(numero)) return 'American Express';
    if (/^6/.test(numero)) return 'Discover';
    return 'Otra';
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este método de pago?')) {
      try {
        await deleteMetodoPago(id);
        cargarMetodosPago();
      } catch (error) {
        console.error('Error al eliminar método de pago:', error);
        setError('Error al eliminar el método de pago');
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setMetodoPagoDefault(id);
      cargarMetodosPago();
    } catch (error) {
      console.error('Error al establecer método predeterminado:', error);
      setError('Error al establecer método predeterminado');
    }
  };

  const obtenerIconoTarjeta = (marca) => {
    switch(marca) {
      case 'Visa': return '/images/visa.png';
      case 'Mastercard': return '/images/mastercard.png';
      case 'American Express': return '/images/amex.png';
      case 'Discover': return '/images/discover.png';
      default: return '/images/credit-card.png';
    }
  };

  return (
    <div className="metodo-pago">
      <section className="sidebar">
        <PerfilSidebar />
      </section>

      <div className="agregar-tarjeta-container">
        <h1 className="titulo-pago">Pago</h1>
        <hr className="separador" />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError("")} className="cerrar-error">X</button>
          </div>
        )}

        {/* Mostrar tarjetas existentes o estado vacío */}
        {!showForm && (
          <div className="contenedor-tarjeta">
            {cargando ? (
              <p>Cargando métodos de pago...</p>
            ) : metodosPago.length > 0 ? (
              <div className="tarjetas-lista">
                <h2>Tus métodos de pago</h2>
                {metodosPago.map((metodo) => (
                  <div key={metodo.id_metodo_pago} className="tarjeta-card">
                    <div className="tarjeta-header">
                      <img 
                        src={obtenerIconoTarjeta(metodo.brand_tarjeta)} 
                        alt={metodo.brand_tarjeta}
                        className="icono-tarjeta"
                      />
                      {metodo.metodo_predeterminado && (
                        <span className="predeterminada-badge">Predeterminada</span>
                      )}
                    </div>
                    <div className="tarjeta-info">
                      <div className="numero-tarjeta">**** **** **** {metodo.tarjeta_ultimo}</div>
                      <div className="nombre-tarjeta">{metodo.nombre_en_tarjeta}</div>
                      <div className="vencimiento">Vence: {metodo.vencimiento_mes}/{metodo.vencimiento_ano}</div>
                    </div>
                    <div className="tarjeta-acciones">
                      {!metodo.metodo_predeterminado && (
                        <button 
                          onClick={() => handleSetDefault(metodo.id_metodo_pago)}
                          className="btn-hacer-predeterminada"
                        >
                          Hacer predeterminada
                        </button>
                      )}
                      <button 
                        onClick={() => handleEliminar(metodo.id_metodo_pago)}
                        className="btn-eliminar-tarjeta"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setShowForm(true)} className="btn-anadir">
                  + Añadir nueva tarjeta
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowForm(true)} className="btn-anadir">
                  + Añadir nueva tarjeta
                </button>
                <p className="texto-info">Aún no has guardado ninguna tarjeta.</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Formulario para agregar tarjeta */}
      {showForm && (
        <div className="contenedor-formulario">
          <div className="imagenes-tarjeta">
            <img src="/images/card-front.png" alt="Tarjeta frontal" />
            <img src="/images/card-back.png" alt="Tarjeta trasera" />
          </div>

          <form className="form-tarjeta" onSubmit={handleSubmit}>
            <div className="campo">
              <label>Número de la tarjeta</label>
              <input 
                type="text" 
                name="numero_tarjeta"
                value={formData.numero_tarjeta}
                onChange={handleInputChange}
                placeholder="0000 0000 0000 0000" 
                maxLength="19"
                required
              />
            </div>

            <div className="fila">
              <div className="campo">
                <label>Nombre</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Diego" 
                  required
                />
              </div>
              <div className="campo">
                <label>Apellido</label>
                <input 
                  type="text" 
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  placeholder="Ej: Matute Lora" 
                  required
                />
              </div>
            </div>

            <div className="fila">
              <div className="campo">
                <label>Fecha de vencimiento</label>
                <div className="vencimiento-input">
                  <input
                    type="text"
                    name="vencimiento_mes"
                    value={formData.vencimiento_mes}
                    onChange={handleInputChange}
                    placeholder="MM"
                    maxLength="2"
                    required
                  />
                  <span></span>
                  <input
                    type="text"
                    name="vencimiento_ano"
                    value={formData.vencimiento_ano}
                    onChange={handleInputChange}
                    placeholder="AA"
                    maxLength="2"
                    required
                  />
                </div>
              </div>
              <div className="campo">
                <label>CVV</label>
                <input 
                  type="text" 
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="000" 
                  maxLength="3"
                  required
                />
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