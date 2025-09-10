import React from "react";
import { getDescuentosAplicadosPorUsuario } from "./api/PromocionesApi";
import "./descuentos_aplicados.css";
const PAGE_SIZE = 8;

function mapApiToRow(p) {
  const pedido = Array.isArray(p.pedidos) ? p.pedidos[0] : p.pedido || {};
  const fecha =
    pedido?.fecha ||
    p.fecha_aplicacion ||
    p.fecha_inicio ||
    p.createdAt ||
    p.updatedAt;

  // toma el monto del descuento según tus columnas reales
  const descuento = p.monto_descuento ?? p.valor_descuento ?? p.descuento ?? 0;

  return {
    fecha,
    factura: pedido?.numero_factura || pedido?.factura || p.factura || "-",
    descuento: Number(descuento) || 0,
  };
}

export default class CuponesTabla extends React.Component {
  state = {
    loading: true,
    error: null,
    rows: [],
    page: 1,
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ page: 1 }, this.load);
    }
  }

  load = async () => {
    try {
      const { userId } = this.props; // pásalo desde el padre
      this.setState({ loading: true, error: null });
      const { data } = await getDescuentosAplicadosPorUsuario(userId);

      // Normaliza cada item a { fecha, factura, descuento }
      const rows = Array.isArray(data) ? data.map(mapApiToRow) : [];
      this.setState({ rows, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: "No se pudo cargar descuentos", loading: false });
    }
  };

  setPage = (next) => {
    const totalPages = Math.max(
      1,
      Math.ceil(this.state.rows.length / PAGE_SIZE)
    );
    const page = Math.min(Math.max(1, next), totalPages);
    this.setState({ page });
  };

  render() {
    const { rows, loading, error, page } = this.state;
    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const pageRows = rows.slice(start, start + PAGE_SIZE);

    return (
      <section className="cupones">
        <h2 className="cupones__title">Descuentos</h2>
        <div className="h-0.5 w-full bg-[#f0833e] mt-2" />

        {/* Línea solo sobre la tabla + tabla */}
        <div className="cupones__tableWrap">
          <table className="cupones__table">
            <colgroup>
              <col style={{ width: "36%" }} />
              <col style={{ width: "34%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>#Factura</th>
                <th className="num">Descuento</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="empty" colSpan={3}>
                    Cargando…
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td className="empty" colSpan={3}>
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && pageRows.length === 0 && (
                <tr>
                  <td className="empty" colSpan={3}>
                    Sin datos.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                pageRows.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.fecha).toLocaleDateString("es-HN")}</td>
                    <td>{r.factura}</td>
                    <td className="num">
                      L.{" "}
                      {r.descuento.toLocaleString("es-HN", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Paginación redonda */}
        <nav className="cupones__pager" aria-label="Paginación">
          <button
            className="pager__btn"
            onClick={() => this.setPage(page - 1)}
            disabled={page === 1}
            title="Anterior"
          >
            ‹
          </button>
          <span className="pager__page is-active">{page}</span>
          <button
            className="pager__btn"
            onClick={() => this.setPage(page + 1)}
            disabled={page === totalPages}
            title="Siguiente"
          >
            ›
          </button>
        </nav>
      </section>
    );
  }
}
