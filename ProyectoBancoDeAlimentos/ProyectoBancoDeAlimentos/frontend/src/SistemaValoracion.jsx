import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import "./SistemaValoracion.css";

/** LineChart muy simple con SVG */
function LineChart({ data, height = 180, padding = 24 }) {
  const width = 360;
  const points = useMemo(() => {
    if (!data || data.length === 0) return "";
    const maxY = Math.max(...data.map((d) => d.value)) || 1;
    const stepX = (width - padding * 2) / (data.length - 1);
    return data
      .map((d, i) => {
        const x = padding + i * stepX;
        const y =
          height - padding - (d.value / maxY) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, height, padding]);

  return (
    <svg className="chart" viewBox={`0 0 ${width} ${height}`}>
      {/* Ejes */}
      <line x1={24} y1={height - 24} x2={width - 8} y2={height - 24} className="axis" />
      <line x1={24} y1={16} x2={24} y2={height - 24} className="axis" />
      {/* Línea */}
      <polyline points={points} className="line" fill="none" />
      {/* Puntos */}
      {data.map((d, i) => {
        const maxY = Math.max(...data.map((p) => p.value)) || 1;
        const stepX = (width - padding * 2) / (data.length - 1);
        const cx = padding + i * stepX;
        const cy =
          height - padding - (d.value / maxY) * (height - padding * 2);
        return <circle key={i} cx={cx} cy={cy} r="4" className="dot" />;
      })}
      {/* Labels del eje X */}
      {data.map((d, i) => {
        const stepX = (width - padding * 2) / (data.length - 1);
        const x = padding + i * stepX;
        return (
          <text key={i} x={x} y={height - 6} className="tick" textAnchor="middle">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function SistemaValoracion() {
  // datos de ejemplo para el gráfico
  const habitos = [
    { label: "Lunes", value: 5 },
    { label: "Martes", value: 9 },
    { label: "Miérc.", value: 12 },
    { label: "Jueves", value: 14 },
    { label: "Viernes", value: 45 },
    { label: "Sábado", value: 80 },
    { label: "Domingo", value: 30 },
  ];

  const [idxRec, setIdxRec] = useState(0);
  const recurrentes = [
    { nombre: "Leche", detalle: "Compras este producto cada 2 semanas", img: null },
    { nombre: "Huevos", detalle: "Cada 10 días", img: null },
    { nombre: "Pan", detalle: "Cada semana", img: null },
  ];
  const item = recurrentes[idxRec];

  return (
    <div className="sv-container">
      {/* fila superior: sugerencia + recurrentes */}
      <div className="sv-row">
        <section className="card sugerencias">
          <h4 className="card-title">SUGERENCIAS DE COMPRA</h4>
          <div className="sugerencia-body">
            <div className="bell">
              <Icon icon="mdi:bell-outline" width="56" />
            </div>
            <div className="sugerencia-texto">
              <h3>Agregar frutas y verduras</h3>
              <p>a tu carrito de compras</p>
            </div>
          </div>
        </section>

        <section className="card recurrentes">
          <h4 className="card-title">PRODUCTOS RECURRENTES</h4>
          <div className="rec-body">
            <button
              className="nav-btn"
              onClick={() => setIdxRec((p) => (p === 0 ? recurrentes.length - 1 : p - 1))}
              aria-label="Anterior"
            >
              <Icon icon="mdi:chevron-left" width="22" />
            </button>

            <div className="rec-producto">
              <div className="rec-img">
                {/* ilustración simple */}
                <div className="leche-icon">
                  <Icon icon="mdi:carton-variant" width="64" />
                </div>
              </div>
              <div className="rec-info">
                <h3>{item.nombre}</h3>
                <p>{item.detalle}</p>
              </div>
            </div>

            <button
              className="nav-btn"
              onClick={() => setIdxRec((p) => (p + 1) % recurrentes.length)}
              aria-label="Siguiente"
            >
              <Icon icon="mdi:chevron-right" width="22" />
            </button>
          </div>
        </section>
      </div>

      {/* fila inferior: hábitos + resumen */}
      <div className="sv-row">
        <section className="card habitos">
          <h4 className="card-title">Hábitos de compra</h4>
          <LineChart data={habitos} />
        </section>

        <section className="card resumen">
          <h4 className="card-title">RESUMEN DE AHORRO</h4>
          <div className="resumen-cifra">L. 550.56</div>
          <p className="resumen-texto">
            Haz ahorrado durante este mes por ofertas <br />
            promociones y descuentos
          </p>
        </section>
      </div>
    </div>
  );
}
