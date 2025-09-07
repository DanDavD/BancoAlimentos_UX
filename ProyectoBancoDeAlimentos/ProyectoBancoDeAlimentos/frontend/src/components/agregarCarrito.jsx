import React, { useState, useEffect } from "react";
import { Minus, Plus, Heart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/InventarioApi";
import { AddNewCarrito, ViewCar, SumarItem } from "../api/CarritoApi";

function AgregarCarrito() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data);

        const found = res.data.find(
          (p) => String(p.id_producto) === String(id)
        );
        if (found) {
          setProduct(found);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("[PRODUCTS] error:", err?.response?.data || err);
        alert(err?.response?.data?.message || "Error al cargar productos");
      }
    };

    fetchProducts();
  }, [id, navigate]);

  const [carrito, setCarrito] = useState(null);

  const handleAgregar = async (id_producto) => {
    if (!id_producto) {
      alert("ID de producto no válido");
      return;
    }

    try {
      console.log("Agregando producto:", id_producto);

      let carritoActual = null;
      let carritoVacio = false;

      try {
        carritoActual = await ViewCar();
        console.log("Carrito actual:", carritoActual.data);
      } catch (error) {
        if (error?.response?.status === 404) {
          console.log("Carrito vacío - usuario nuevo");
          carritoVacio = true;
        } else {
          throw error;
        }
      }

      let existe = false;
      if (!carritoVacio && carritoActual?.data) {
        const items = carritoActual.data.carrito_detalles || carritoActual.data;
        existe = Array.isArray(items)
          ? items.find((item) => item.id_producto === id_producto)
          : false;
      }

      let response;

      if (existe) {
        console.log("Producto existe, sumando cantidad...");
        response = await SumarItem(id_producto, quantity);
        console.log("Sumado", response.data);
        alert(`Se aumentó la cantidad del producto`);
      } else {
        console.log("Producto nuevo o carrito vacío, agregando...");
        response = await AddNewCarrito(id_producto, quantity);
        console.log("Agregado", response.data);
        alert(`Producto agregado al carrito`);
      }

      try {
        const actualizado = await ViewCar();
        setCarrito(actualizado.data);
      } catch (error) {
        console.log(
          "No se pudo recargar el carrito, pero el producto se agregó"
        );
      }
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Respuesta del servidor:", error?.response?.data);

      const errorMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "No se pudo procesar el carrito";

      alert(errorMessage);
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  if (!product) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingText}>Cargando producto...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Compras frecuentes */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Compras Frecuentes</h2>

          <div style={styles.List}>
            {products.map((p, index) => (
              <div
                key={index}
                style={styles.Card}
                onClick={() => handleProductClick(p.id_producto)}
              >
                <div style={styles.cardTopRow}>
                  <span style={styles.badge}>Oferta</span>
                  <div style={styles.stars}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        style={{
                          color:
                            i < Math.round(p.estrellas) ? "#2b6daf" : "#ddd",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.cardImageWrapper}>
                  <img src={p.img} alt={p.nombre} style={styles.cardImage} />
                </div>

                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{p.nombre}</h3>

                  <p style={styles.cardPrice}>L. {p.precio_base} P/Kilo</p>

                  <button
                    style={styles.addButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity(1);
                      handleAgregar(p.id_producto, quantity);
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalle del producto */}
        <div style={styles.detailWrapper}>
          <div style={styles.detailCard}>
            <div style={styles.detailGrid}>
              {/* Imagen */}
              <div style={styles.detailImageWrapper}>
                <img
                  src={product.img}
                  alt={product.nombre}
                  style={styles.detailImage}
                />
              </div>

              {/* Info */}
              <div style={styles.detailInfo}>
                <h1 style={styles.detailTitle}>{product.nombre}</h1>
                <p style={styles.detailCode}>Código: {product.id_producto}</p>

                <div style={styles.detailStockWrapper}>
                  <div style={styles.detailPrice}>
                    L. {product.precio_base}{" "}
                    <span style={styles.detailPriceUnit}>P/Kilo</span>
                  </div>
                </div>

                <div style={styles.actionsRow}>
                  <div style={styles.quantityWrapper}>
                    <button style={styles.qtyBtn} onClick={decrementQuantity}>
                      <Minus size={20} />
                    </button>
                    <span style={styles.qtyText}>{quantity}</span>
                    <button style={styles.qtyBtn} onClick={incrementQuantity}>
                      <Plus size={20} />
                    </button>
                  </div>

                  <button
                    style={styles.cartBtn}
                    onClick={() => {
                      handleAgregar(product.id_producto, quantity);
                    }}
                  >
                    AGREGAR AL CARRITO
                  </button>

                  <button
                    style={styles.favoriteBtn}
                    onClick={() => {
                      // lógica favoritos
                    }}
                  >
                    <Heart size={24} fill="white" />
                  </button>
                </div>
                <div style={styles.detailDescription}>
                  Descripción: {product.descripcion}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    position: "absolute",
    top: "145px",
    left: 0,
    right: 0,
    width: "100%",
    height: "calc(100% - 145px)",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    padding: "20px",
    margin: "0 auto",
    display: "flex",
    gap: "20px",
    width: "100%",
    maxWidth: "1400px",
  },
  loadingWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: "20px",
    color: "#666",
  },
  sidebar: {
    flexShrink: 0,
    width: "280px",
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    height: "100vh",
    overflowY: "auto",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  List: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  Card: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  cardTopRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3px",
  },
  badge: {
    backgroundColor: "#2b6daf",
    color: "white",
    fontSize: "16px",
    padding: "1px 15px",
    borderRadius: "25px",
  },
  stars: {
    color: "#2b6daf",
    fontSize: "25px",
  },
  cardImageWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  },
  cardImage: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
  cardContent: {
    marginTop: "12px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "500",
    marginBottom: "6px",
    textAlign: "left",
  },
  stockText: {
    fontSize: "13px",
    fontWeight: "500",
  },
  cardPrice: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
    textAlign: "left",
  },
  addButton: {
    width: "100%",
    backgroundColor: "#F0833E",
    color: "white",
    border: "none",
    padding: "8px 0",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
  },
  detailWrapper: {
    flex: 1,
  },
  detailCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    height: "100%",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    height: "100%",
  },
  detailImageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
  },
  detailImage: {
    width: "100%",
    height: "350px",
    objectFit: "contain",
  },
  detailInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    gap: "0px",
  },
  detailTitle: {
    fontSize: "28px",
    fontWeight: "700",
  },
  detailCode: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  detailPrice: {
    fontSize: "26px",
    fontWeight: "700",
  },
  detailPriceUnit: {
    fontSize: "16px",
    fontWeight: "400",
  },
  detailDescription: {
    fontSize: "14px",
    color: "#444",
    marginTop: "10px",
    textAlign: "left",
  },
  actionsRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  quantityWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  qtyBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#2b6daf",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: "18px",
    fontWeight: "600",
    width: "30px",
    textAlign: "center",
  },
  cartBtn: {
    flex: 1,
    backgroundColor: "#F0833E",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  favoriteBtn: {
    backgroundColor: "#F0833E",
    border: "none",
    borderRadius: "25px",
    padding: "10px 16px",
    color: "white",
    cursor: "pointer",
  },
};

export default AgregarCarrito;
