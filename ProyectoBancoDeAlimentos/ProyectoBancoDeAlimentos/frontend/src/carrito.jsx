import { useState, useEffect } from "react";
import carrito from "./images/carrito_icon.png";

import { useRef } from "react";
import arrowL from "./images/arrowL.png";
import arrowR from "./images/arrowR.png";
import React from "react";
import { getAllProducts } from "./api/InventarioApi";
import { useParams } from "react-router-dom";
//Agregar Parametro que diga cuantos productos en carrito?
function Carrito() {
  //Objeto de producto

  //Productos de pagina de inicio //necesita cantidad, imagen
  const [products, setProducts] = useState([]);
  //Scroll
  const scroll = (direction, ref, itemWidth) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };
  //carrito id
  const { id } = useParams();
  //Referencia de los productos recomendados para scroll
  const prodRefRecomendados = useRef(null);

  const [hoveredProductDest, setHoveredProductDest] = React.useState(null);

  //Saber si el carrito esta vacio o no
  const productosCarrito = useState(0);
  const [cupon, setCupon] = useState("");
  const [showProducts, setShowProd] = useState(true);

  const updateQuantity = (name, n) => {
    if (n < 0) return;
    setProducts((prev) =>
      prev.map((p) => (p.nombre === name ? { ...p, cantidad: n } : p))
    );
  };
  //Verifica si el cupon es valido
  function checkCupon() {}
  function realizarCompra() {}
  useEffect(() => {
    const productos = async () => {
      try {
        const res = await getAllProducts();
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("[REGISTER] error:", err?.response?.data || err);
        alert(err?.response?.data?.message || "Error");
      }
    };
    productos();

    return () => {};
  }, []);
  return (
    <div className="bg-gray-100 w-screen min-h-screen py-4 overflow-x-hidden items-center">
      <div className="px-32">
        <div>
          <h1 className="font-roboto text-[#f0833e] text-5xl justify-center pb-3 text-left">
            Carrito
          </h1>
          <hr className="bg-[#f0833e] h-[2px] mb-4"></hr>
        </div>
        <div className="grid grid-cols-3 gap-8 h-[350px]">
          <div className="col-span-2 w-full rounded-md border-gray-200 border-2 overflow-y-auto">
            {
              //se renderiza solo si productos es = 0
              !showProducts && (
                <div className="flex flex-row justify-center items-center gap-8">
                  <img src={carrito} className="object-cover mt-16"></img>

                  <div className="mx-4 flex flex-col gap-y-6 font-medium">
                    <p className="text-[24px] mt-8">Tu carrito esta vacio</p>
                    <button className="bg-[#2B6DAF] text-[28px] text-white rounded-[10px] p-3 px-6">
                      Explora articulos
                    </button>
                  </div>
                </div>
              )
            }
            {
              //Productos en carrito
              showProducts && (
                <div className="px-6 py-4">
                  <ul className="flex flex-col space-y-4">
                    {products.map((prod, i) => (
                      <li key={i}>
                        <div className="flex flex-row gap-8">
                          {prod.imagenes &&
                          prod.imagenes.length > 0 &&
                          prod.imagenes[0].url_imagen ? (
                            <img
                              src={`/images/productos/${prod.imagenes[0].url_imagen}`}
                              alt={prod.nombre}
                              style={styles.productImg}
                              onError={(e) => {
                                e.target.src =
                                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23999">Imagen no disponible</text></svg>';
                              }}
                            />
                          ) : (
                            <div style={styles.productImg}>
                              Imagen no disponible
                            </div>
                          )}

                          <div className="flex flex-col w-full text-left font-medium">
                            <p className="py-2 text-xl">{prod.nombre}</p>
                            <div className="flex flex-row gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(prod.nombre, 5 - 1)
                                }
                                className=" bg-[#114C87] text-white rounded-md h-9 px-1"
                              >
                                <span class="material-symbols-outlined text-3xl">
                                  check_indeterminate_small
                                </span>
                              </button>
                              <input
                                className="border-2 border-black rounded-md text-center"
                                value={5}
                              ></input>
                              <button
                                onClick={() =>
                                  updateQuantity(prod.nombre, 5 + 1)
                                }
                                className="bg-[#114C87] text-white rounded-md h-9 px-1"
                              >
                                <span class="material-symbols-outlined text-3xl">
                                  add
                                </span>
                              </button>
                              <div className="flex justify-center w-full">
                                <p className="text-xl pl-6">
                                  {prod.precio_base}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button className=" text-black hover:bg-red-500 hover:text-white rounded-md px-6">
                            <span class="material-symbols-outlined text-5xl ">
                              delete
                            </span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          </div>
          <div className="flex flex-col col-span-1 w-full rounded-md border-gray-200 border-2 px-6 py-1 pb-2">
            {
              //CODIGO CUPON SOLO SE MUESTRA SI HAY PRODUCTOS EN CARRITO
              showProducts && (
                <div className="pb-2">
                  <p className="text-left pb-2 font-medium">
                    ¿Tienes un cupon?
                  </p>
                  <form className="flex gap-2" onSubmit={checkCupon}>
                    <input
                      type="text"
                      placeholder="Codigo"
                      className="input-field rounded-xl bg-gray-100 border-black border-2 pl-2"
                      onChange={(e) => setCupon(e.target.value)}
                    ></input>
                    <button className="bg-[#114C87] rounded-md py-1 text-white px-12 text-xl">
                      Aplicar
                    </button>
                  </form>
                </div>
              )
            }

            {
              //RESUMEN DE PAGO SIEMPRE SE MUESTRA
            }
            <div>
              <h1 className="font-roboto text-[#80838A] text-2xl font-medium justify-center pb-1 text-left">
                Resumen de pago
              </h1>
              <hr className="bg-[#80838A] h-[2px] w-full mb-1"></hr>

              {
                //BOTON DE COMPRA
              }
            </div>
            {
              //FACTURA SE MUESTRA SI HAY PRODUCTOS EN CARRITO
              showProducts && (
                <div>
                  <ul className="text-left space-y-3 font-medium text-md">
                    <li className="flex justify-between">
                      <span>Subtotal</span>
                      <span>L.32</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Entrega</span>
                      <span>L.5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Impuesto</span>
                      <span>15%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Descuento</span>
                      <span>15%</span>
                    </li>
                    <hr className="bg-black h-[3px] w-full" />
                    <li className="text-lg font-bold flex justify-between">
                      <span>Total</span>
                      <span>L.37</span>
                    </li>
                    <button
                      onClick={realizarCompra}
                      className="bg-[#F0833E] rounded-md text-white text-xl w-full p-1"
                    >
                      Efectuar Compra
                    </button>
                  </ul>
                </div>
              )
            }

            {
              //PROTECCION DEL COMPRADOR SE MUESTRA CUANDO NO HAY PRODUCTOS EN CARRITO
              !showProducts && (
                <div className="flex flex-col text-blue-950 justify-end h-full text-left">
                  <div className="flex flex-row items-center">
                    <span class="material-symbols-outlined text-4xl pr-2">
                      verified_user
                    </span>
                    <h1 className="font-bold text-lg">
                      Proteccion del comprador
                    </h1>
                  </div>
                  <p className="text-md">
                    Recibe un reembolso de tu dinero si el articulo
                    <br />
                    no llega o es diferente al de la descripcion.
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h1 className="font-roboto text-[#f0833e] text-3xl justify-center text-left px-32">
          Recomendaciones
        </h1>
        <hr className="bg-[#f0833e] h-[2px]"></hr>
        <div className="p-4">
          <div style={styles.scrollWrapper}>
            <button
              style={styles.arrow}
              onClick={() => scroll("left", prodRefRecomendados, 140)}
            >
              <img
                src={arrowL}
                alt="left"
                style={{ width: "100%", height: "100%" }}
              />
            </button>

            <div style={styles.divProducts} ref={prodRefRecomendados}>
              {products.map((p, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.productBox,
                    border:
                      hoveredProductDest === i
                        ? "2px solid #2b6daf"
                        : "2px solid transparent",
                    transform:
                      hoveredProductDest === i ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={() => setHoveredProductDest(i)}
                  onMouseLeave={() => setHoveredProductDest(null)}
                >
                  <div style={styles.topRow}>
                    <div style={styles.stars}>
                      <span>★</span>
                      <span>★</span>
                      <span>☆</span>
                    </div>
                  </div>

                  {p.imagenes &&
                  p.imagenes.length > 0 &&
                  p.imagenes[0].url_imagen ? (
                    <img
                      src={`/images/productos/${p.imagenes[0].url_imagen}`}
                      alt={p.nombre}
                      style={styles.productImg}
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23999">Imagen no disponible</text></svg>';
                      }}
                    />
                  ) : (
                    <div style={styles.productImg}>Imagen no disponible</div>
                  )}
                  <p style={styles.productName}>{p.nombre}</p>
                  <p style={styles.productPrice}>{p.precio_base}</p>
                  <button
                    style={{
                      ...styles.addButton,
                      backgroundColor:
                        hoveredProductDest === i ? "#2b6daf" : "#F0833E",
                    }}
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>

            <button
              style={styles.arrow}
              onClick={() => scroll("right", prodRefRecomendados, 140)}
            >
              <img
                src={arrowR}
                alt="right"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  divProducts: {
    display: "flex",
    gap: "13px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    width: "100%",
    scrollbarWidth: "none",
    padding: "10px 10px",
  },
  scrollWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 20px",
  },
  arrow: {
    background: "transparent",
    width: "35px",
    height: "35px",
    cursor: "pointer",
    margin: "0 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productBox: {
    flexShrink: 0,
    width: "200px",
    height: "220px",
    borderRadius: "25px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  },
  topRow: {
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
  productName: {
    width: "100%",
    textAlign: "left",
    fontSize: "18px",
    marginTop: "auto",
  },
  productPrice: {
    width: "100%",
    textAlign: "left",
    fontSize: "17px",
    color: "#999",
    marginTop: "auto",
  },
  addButton: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#F0833E",
    color: "white",
    border: "#D8572F",
    borderRadius: "25px",
    padding: "2px 0",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
  },
  productImg: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    marginTop: "8px",
  },
};

export default Carrito;
