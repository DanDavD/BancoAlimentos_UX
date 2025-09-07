import React, { useState, useRef, useEffect } from "react";
import "./categoria.css";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import { getAllProducts } from "./api/InventarioApi";
function Categoria() {
  const subcategories = ["Hellmans", "Campofresco", "Naturas"];
  const prodRefRecomendados = useRef(null);
  const [products, setProducts] = useState([]);
  const [orderby, setOrder] = useState("");
  const [stateProducto, setState] = useState("Agregar");
  const [btnCompare, setCompare] = useState("COMPARAR");

  const [hoveredProductDest, setHoveredProductDest] = React.useState(null);

  function agregarComparar() {
    if (stateProducto === "Agregar") {
      setState("Comparar");
      setCompare("CANCELAR");
      return;
    }

    setState("Agregar");
    setCompare("COMPARAR");
  }
  useEffect(() => {
    const productos = async () => {
      try {
        const res = await getAllProducts();
        console.log(res.data);
        setProducts(res.data);
        res.data.forEach((p) => {
          console.log("Producto:", p.nombre);
          console.log("Precio:", p.precio_base);
          console.log("Subcategoría:", p.subcategoria?.nombre);
          console.log("Categoría:", p.subcategoria?.categoria?.nombre);
          console.log("Marca:", p.marca?.nombre);
          console.log("Imagen 1:", p.imagenes[0].url_imagen);
          //Obtener primera imagen
          if (p.imagenes?.length > 0) {
            console.log("Imagen principal:", p.imagenes[0].url_imagen);
          }
          //Obtener todas
          p.imagenes.forEach((img) => {
            console.log("🖼️ Imagen URL:", img.url_imagen);
          });
        });
      } catch (err) {
        console.error("[REGISTER] error:", err?.response?.data || err);
        alert(err?.response?.data?.message || "Error");
      }
    };
    productos();

    return () => {};
  }, []);

  return (
    <div className="bg-gray-100 w-screen min-h-screen py-2 px-2">
      <div className="flex flex-row">
        {
          //Sidebar Sub-categorias
        }
        <div className="flex flex-col h-[578px] fixed w-[265px] gap-1 ">
          {
            //Sub-categoria
          }
          <div className="border-gray-300 border-2 space-y-1 px-4 py-2 rounded-md">
            <h1 className="header">Sub-categoria</h1>
            <div className="border-gray-400 border-2 flex flex-row rounded-md h-8">
              <input
                placeholder="Buscar"
                className="pl-2 focus:outline-none bg-gray-100 w-full text-[14px]"
              ></input>
              <button className="">
                <span class="material-symbols-outlined text-2xl">search</span>
              </button>
            </div>

            <ul className="overflow-y-auto h-20">
              {subcategories.map((sub, i) => (
                <li key={i}>
                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox
                      color="secondary" // "primary", "secondary", "error", "success"
                      size="medium" // "small", "medium", "large"
                      sx={{
                        color: "",
                        "&.Mui-checked": { color: "#114C87" }, // checked color
                      }}
                    />
                    <p>{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h1 className="header">Marca</h1>
            <select className="w-full border-gray-300 border-2 rounded-md py-1">
              <option value="">Buscar marcas</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
            </select>
          </div>
          {
            //Precio
          }
          <div className="border-gray-300 border-2  py-2 space-y-1 rounded-md">
            <h1 className="header px-4">Precio</h1>
            <div className=" flex flex-col px-4">
              <Slider
                defaultValue={50}
                min={10}
                max={100}
                step={10}
                valueLabelDisplay="auto"
                className=""
                sx={{
                  color: "green", // color of the active track
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#D4D3D2",
                  },
                  "& .MuiSlider-rail": {
                    opacity: 1,
                    backgroundColor: "#D4D3D2",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#D4D3D2",
                    border: "#D4D3D2",
                  },
                }}
              />
              <div className="flex flex-row w-full">
                <p className="text-left">L.10</p>
                <p className="ml-auto">L.100</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-[14px] font-medium px-1">
              <button className="bg-white border-2 border-gray-300 rounded-md h-[38px]  whitespace-nowrap px-1">
                Menos 10L
              </button>
              <button className="bg-white border-2 border-gray-300 rounded-md h-[38px]  whitespace-nowrap px-1">
                Menos 50L
              </button>
              <button className="bg-white border-2 border-gray-300 rounded-md h-[38px]  whitespace-nowrap px-1">
                Mas 100L
              </button>
            </div>
          </div>
          {
            //Ordenar Por
          }
          <div className="border-gray-300 border-2 px-2 py-2 pb-4 space-y-1 rounded-md">
            <h1 className="header">Ordenar por</h1>
            <div className="flex flex-col border-gray-300 bg-gray-200 border-2 rounded-md py-1">
              <button
                className={`${orderby === "Relevancia" ? "bg-[#D8DADC]" : ""}`}
                onClick={(e) => setOrder(e.target.innerText)}
              >
                Relevancia
              </button>
              <button
                className={`${
                  orderby === "Mas Vendidos" ? "bg-[#D8DADC]" : ""
                }`}
                onClick={(e) => setOrder(e.target.innerText)}
              >
                Mas Vendidos
              </button>
              <button
                className={`${orderby === "Novedades" ? "bg-[#D8DADC]" : ""}`}
                onClick={(e) => setOrder(e.target.innerText)}
              >
                Novedades
              </button>
            </div>
          </div>
          <button
            onClick={agregarComparar}
            className={`btnSubCat ${
              stateProducto === "Agregar" ? "bg-[#2B6DAF]" : "bg-[#80838A]"
            }`}
          >
            {btnCompare}
          </button>
        </div>
        {
          //Display Productos
        }
        <div className="w-full ml-[285px] mr-[20px]">
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

                <img
                  src={p.imagenes[0].url_imagen}
                  alt={p.nombre}
                  style={styles.productImg}
                />
                <p style={styles.productName}>{p.nombre}</p>
                <p style={styles.productPrice}>{p.precio_base}</p>
                <button
                  style={{
                    ...styles.addButton,
                    backgroundColor:
                      hoveredProductDest === i ? "#2b6daf" : "#F0833E",
                  }}
                >
                  {stateProducto}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  divProducts: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 5 per row
    gap: "13px",
    width: "100%",
    padding: "10px",
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
export default Categoria;
