import "./agregarCarrito.css";
import React, { useState, useEffect } from "react";
import { Minus, Plus, Heart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import imgProd1 from "../images/imgProd1.png";
import imgProd2 from "../images/imgProd2.png";
import imgProd3 from "../images/imgProd3.png";

const productsDB = {
  1: {
    id: 1,
    name: "Manzana Roja Premium",
    price: 10.0,
    itemNumber: "1",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  2: {
    id: 2,
    name: "Arroz Blanco Embasado El Progreso 1.7 kg",
    price: 25.3,
    itemNumber: "2",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  3: {
    id: 3,
    name: "Leche Entera La Vaca Feliz 1L",
    price: 35.0,
    itemNumber: "3",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  4: {
    id: 4,
    name: "Pan Integral Artesanal",
    price: 15.0,
    itemNumber: "4",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  5: {
    id: 5,
    name: "Huevos de Granja AAA x12",
    price: 40.0,
    itemNumber: "5",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  6: {
    id: 6,
    name: "Pollo Fresco Entero",
    price: 80.0,
    itemNumber: "6",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  7: {
    id: 7,
    name: "Queso Fresco Nacional",
    price: 60.0,
    itemNumber: "7",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  8: {
    id: 8,
    name: "Yogurt Natural 500ml",
    price: 25.0,
    itemNumber: "8",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
  9: {
    id: 9,
    name: "Cereal Integral con Miel",
    price: 45.0,
    itemNumber: "9",
    available: true,
    images: [imgProd1, imgProd2, imgProd3],
  },
};

function AgregarCarrito() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const frequentPurchases = [
    {
      id: 2,
      name: "Arroz Blanco",
      price: 25.3,
      available: true,
      offer: true,
      image: imgProd1,
    },
    {
      id: 5,
      name: "Huevos de Granja",
      price: 40.0,
      itemNumber: "5",
      available: true,
      images: [imgProd1, imgProd2, imgProd3],
    },
    {
      id: 8,
      name: "Yogurt Natural 500ml",
      price: 25.0,
      itemNumber: "8",
      available: true,
      images: [imgProd1, imgProd2, imgProd3],
    },
  ];

  useEffect(() => {
    const productData = productsDB[id];
    if (productData) {
      setProduct(productData);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleFrequentProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Cargando producto...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-screen w-screen position absolute top-36 left-0 p-6">
      <div className="flex gap-6 p-6 h-full">
        <div className="w-100 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Compras Frecuentes
            </h2>

            <div className="flex flex-col gap-4 overflow-y-auto h-[650px] pr-2 position relative">
              {frequentPurchases.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-3 shadow-lg border-2 border-transparent
                             w-[250px] h-[350px] cursor-pointer hover:scale-105 
                             transition-all duration-200"
                  onClick={() => handleFrequentProductClick(item.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    {item.offer && (
                      <span className="bg-[#2b6daf] text-white text-sm px-3 py-1 rounded-full">
                        Oferta
                      </span>
                    )}
                    <div className="text-[#2b6daf] text-xl">
                      <span>★</span>
                      <span>★</span>
                      <span className="text-gray-300">☆</span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  <div className="mt-auto pt-4">
                    <h3 className="text-left text-lg font-medium mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${
                          item.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.available ? "DISPONIBLE" : "NO DISPONIBLE"}
                      </span>
                    </div>
                    <p className="text-left text-base text-gray-600 mb-3">
                      L. {item.price}P/Kilo
                    </p>

                    <button
                      className="w-full bg-[#F0833E] hover:bg-[#2b6daf] text-white py-2 rounded-full font-medium transition-colors duration-200 text-lg border border-[#D8572F]"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí iría la lógica para agregar al carrito
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col items-center border rounded-lg justify-center p-4">
                <div className="mb-4">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-80 object-contain border rounded-lg"
                  />
                </div>
                <div className="flex space-x-2 justify-center">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 border-2 rounded ${
                        selectedImage === index
                          ? "border-orange-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={product.images[index]}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full text-left justify-center flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600 mb-4">
                  Número Item: {product.itemNumber}
                </p>

                <div className="mb-6">
                  <span
                    className={`font-semibold ${
                      product.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.available ? "DISPONIBLE" : "NO DISPONIBLE"}
                  </span>
                  <div className="text-3xl font-bold text-gray-800 mt-2">
                    L. {product.price.toFixed(2)}{" "}
                    <span className="text-lg font-normal">P/Kilo</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 rounded-full border-2 border-[#2B6DAF] bg-[#2B6DAF] text-white flex items-center justify-center hover:bg-[#1f4d7a]"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-semibold w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 rounded-full border-2 border-[#2B6DAF] bg-[#2B6DAF] text-white flex items-center justify-center hover:bg-[#1f4d7a]"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <button
                    className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-[25px] font-semibold hover:bg-orange-600 transition-colors"
                    onClick={() => {
                      // Aquí iría la lógica para agregar al carrito
                    }}
                  >
                    AGREGAR AL CARRITO
                  </button>

                  <button
                    className="bg-red-500 text-white py-3 px-6 rounded-[25px] font-semibold border-2 border-red-500 hover:bg-red-600 transition-colors"
                    onClick={() => {
                      // Aquí iría la lógica para agregar a favoritos
                    }}
                  >
                    <Heart size={24} fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgregarCarrito;
