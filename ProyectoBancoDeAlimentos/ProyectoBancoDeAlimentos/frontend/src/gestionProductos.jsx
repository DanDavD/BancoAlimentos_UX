import "./gestionProductos.css";
import Sidebar from "./sidebar";
import React, { useState } from "react";

function GestionProductos() {
  //Sidebar
  const [moveButton, setLeft] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  //Info del producto a agregar
  const [producto, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [marca, setMarca] = useState("");
  const [count, setCantidad] = useState(0);

  //Categoria y subcategorias seleccionadas
  const [categoryName, setCategoria] = useState("Granos Basicos");
  const [subName, setSubcategoria] = useState("");

  //Muestran las ventanas de agregar categoria/subcategoria
  const [showCat, setShowCat] = useState(false);
  const [showSub, setShowSub] = useState(false);

  //Se guarda la nueva categoria/subcategoria a agregar
  const [newCategory, setNew] = useState("");
  const [newSub, setNewSub] = useState("");

  const [categories, setCategories] = useState([
    { name: "Granos Basicos", subcategories: ["Arroz", "Avena", "Azucar"] },
    {
      name: "Productos Procesados/Secos",
      subcategories: ["Cereales", "Galletas", "Queso"],
    },
    {
      name: "Aceites y Grasas",
      subcategories: [
        "Aceites Vegetales",
        "Aceites de Pescado",
        "Grasas Animales",
      ],
    },
  ]);

  function addCategory(category) {
    setCategories((prevCat) => [
      ...prevCat,
      { name: category, subcategories: [] },
    ]);
  }
  function addSubCategory(newSub) {
    setCategories((prevCat) =>
      prevCat.map((cat) =>
        cat.name === categoryName
          ? { ...cat, subcategories: [...cat.subcategories, newSub] }
          : cat
      )
    );
  }
  const handleClick = () => {
    setLeft(!moveButton);
    setShowSidebar(!showSidebar);
  };

  const addProducto = (e) => {
    //se envia la info a base de datos del nuevo producto
    //nombre,precio,marca,cantidad
    //Se necesita categoryName y subName
  };
  const addCat = (e) => {
    setShowCat(false);
    e.preventDefault();
    addCategory(newCategory);
  };
  const addSubcat = (e) => {
    setShowSub(false);
    e.preventDefault();
    addSubCategory(newSub);
  };
  return (
    <div className="bg-gray-100 h-screen">
      {showSidebar && <Sidebar />}
      <button
        onClick={handleClick}
        className={`btn_sidebar ${moveButton ? "left-[180px]" : "left-2"}`}
      >
        <span className="material-symbols-outlined text-[42px] text-white">
          menu
        </span>
      </button>

      <div
        className={`pt-5 transition-all duration-300 ${
          moveButton ? "ml-[270px] mr-[70px]" : "ml-[70px] mr-[70px]"
        }`}
      >
        <h1 className="font-roboto text-[#f0833e] text-5xl justify-center pb-1">
          Gestion de Productos
        </h1>
        <hr className="bg-[#f0833e] h-[2px]"></hr>
        <div className="">
          <div className=" pt-5 grid grid-cols-2 grid-rows-2 h-[620px] items-stretch gap-4">
            <div className=" col-span-1 row-span-2 bg-white w-full rounded-md items-center text-xl overflow-y-auto p-2">
              <h1 className="relative px-2 font-roboto text-gray-500 text-4xl pb-1">
                Categorias
                <button
                  onClick={() => setShowCat(true)}
                  className="absolute right-0"
                >
                  <span class="material-symbols-outlined text-5xl">add</span>
                </button>
              </h1>
              <hr className="bg-gray-500 h-[2px]"></hr>
              <ul className="flex flex-col mt-4">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <div className="flex">
                      <button
                        onClick={() => {
                          setCategoria(cat.name);
                        }}
                        className={`list-item ${
                          categoryName === cat.name
                            ? "bg-orange-100 border-orange-500"
                            : "hover:bg-orange-100 hover:border-orange-500"
                        }`}
                      >
                        {cat.name}
                      </button>
                      <button className="border-2 hover:bg-orange-100 hover:border-orange-500 rounded-md p-1">
                        <span class="material-symbols-outlined text-3xl">
                          edit_square
                        </span>
                      </button>
                      <button className="border-2 hover:bg-orange-100 hover:border-orange-500 rounded-md p-1">
                        <span class="material-symbols-outlined text-3xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 grid-rows-2 h-[600px] items-stretch gap-8">
              <div className=" col-span-1 row-span-1 bg-white w-full rounded-md items-center text-xl overflow-y-auto p-2">
                <h1 className="relative px-2 font-roboto text-gray-500 text-4xl pb-1">
                  Subcategorias
                  <button
                    onClick={() => setShowSub(true)}
                    className="absolute right-0"
                  >
                    <span class="material-symbols-outlined text-5xl">add</span>
                  </button>
                </h1>
                <hr className="bg-gray-500 h-[2px]"></hr>
                <ul className="flex flex-col mt-4">
                  {categories
                    .find((cat) => cat.name === categoryName)
                    .subcategories.map((sub, i) => (
                      <li key={i}>
                        <div className="flex">
                          <button
                            onClick={() => {
                              setSubcategoria(sub);
                            }}
                            className={`list-item ${
                              subName === sub
                                ? "bg-orange-100 border-orange-500"
                                : "hover:bg-orange-100 hover:border-orange-500"
                            }`}
                          >
                            {sub}
                          </button>
                          <button className="border-2 hover:bg-orange-100 hover:border-orange-500 rounded-md p-1">
                            <span class="material-symbols-outlined text-3xl">
                              edit_square
                            </span>
                          </button>
                          <button className="border-2 hover:bg-orange-100 hover:border-orange-500 rounded-md p-1">
                            <span class="material-symbols-outlined text-3xl">
                              delete
                            </span>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className=" flex flex-col col-span-1 row-span-1 bg-white w-full rounded-md items-center  text-xl p-2">
                <div className="w-full">
                  <h1 className="px-2 font-roboto text-gray-500 text-4xl pb-1">
                    Producto
                  </h1>
                  <hr className="bg-gray-500 h-[2px]"></hr>{" "}
                </div>

                <form
                  className="flex flex-col gap-8 mt-4"
                  onSubmit={addProducto}
                >
                  <div className="flex gap-8">
                    <input
                      type="text"
                      placeholder="Producto"
                      className="input-field rounded-md bg-gray-100 p-2 border-gray-500 border-2"
                      value={producto}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Precio"
                      className="input-field rounded-md bg-gray-100 p-2 border-gray-500 border-2"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-8">
                    <input
                      type="text"
                      placeholder="Marca"
                      className="input-field rounded-md bg-gray-100 p-2 border-gray-500 border-2"
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <p className="text-2xl pt-1">Medida:</p>
                      <input
                        type="number"
                        placeholder="Kg"
                        className="input-field rounded-md w-32 bg-gray-100 p-2 border-gray-500 border-2"
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 rounded-md text-white p-1 w-36 text-[16px] whitespace-nowrap"
                  >
                    Agregar Producto
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        {showCat && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg w-96  relative animate-fadeIn">
              <h2 className="bg-[#2b6daf] text-xl rounded-md font-bold p-2 text-center text-white mb-6">
                Agregar Categoria
              </h2>

              <form
                className="flex flex-col space-y-4 pr-6 pl-6 pb-8"
                onSubmit={addCat}
              >
                <div>
                  <p className="text-[18px]">Nombre</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setNew(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-8">
                  <button
                    onClick={() => setShowCat(false)}
                    className="text-white py-2 w-1/2 bg-red-600 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className=" bg-blue-600 text-white py-2 w-1/2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showSub && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg w-96  relative animate-fadeIn">
              <h2 className="bg-[#2b6daf] text-xl rounded-md font-bold p-2 text-center text-white mb-6">
                Agregar Subcategoria
              </h2>

              <form
                className="flex flex-col space-y-4 pr-6 pl-6 pb-8"
                onSubmit={addSubcat}
              >
                <div>
                  <p className="text-[18px]">Nombre</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setNewSub(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-8">
                  <button
                    onClick={() => setShowSub(false)}
                    className="text-white py-2 w-1/2 bg-red-600 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className=" bg-blue-600 text-white py-2 w-1/2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GestionProductos;
