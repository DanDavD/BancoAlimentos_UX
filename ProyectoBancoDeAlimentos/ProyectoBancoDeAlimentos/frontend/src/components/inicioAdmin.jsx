import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import Sidebar from "../sidebar";
import { useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import carrot from "../images/carrot.png";
import apple from "../images/apple.png";
import pet from "../images/pet.png";
import ham from "../images/ham.png";
import cake from "../images/cake.png";
import bread from "../images/bread.png";
import juice from "../images/juice.png";
import clean from "../images/clean.png";
import soccer from "../images/soccer.png";
import phone from "../images/phone.png";
import pharmacy from "../images/pharmacy.png";
import milk from "../images/milk.png";
import arrowL from "../images/arrowL.png";
import arrowR from "../images/arrowR.png";
import appleImage from "../images/appleImage.png";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";

const categories = [
  { name: "Lácteos", icon: milk },
  { name: "Farmacia", icon: pharmacy },
  { name: "Electrónico", icon: phone },
  { name: "Deportes", icon: soccer },
  { name: "Limpieza", icon: clean },
  { name: "Jugos", icon: juice },
  { name: "Panadería", icon: bread },
  { name: "Repostería", icon: cake },
  { name: "Embutidos", icon: ham },
  { name: "Mascotas", icon: pet },
  { name: "Frutas", icon: apple },
  { name: "Verduras", icon: carrot },
];

const products = [
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
  { name: "Manzana", price: "L. 10.00", img: appleImage },
];

const banners = [banner1, banner3, banner2];

const InicioAdmin = () => {
  const catRef = useRef(null);
  const prodRef = useRef(null);
  const [moveButton, setLeft] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const scroll = (direction, ref, itemWidth) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };

  const handleClick = () => {
    setLeft(!moveButton);
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#F5F5F5" }}>
      {showSidebar && <Sidebar />}
      <button
        onClick={handleClick}
        className={`btn_sidebar ${moveButton ? "left-[180px]" : "left-2"}`}
      >
        <span className="material-symbols-outlined text-[42px] text-white">
          menu
        </span>
      </button>

      {/* Categories */}
      <div style={styles.scrollWrapper}>
        <button
          style={styles.arrow}
          onClick={() => scroll("left", catRef, 140)}
        >
          <img
            src={arrowL}
            alt="left"
            style={{ width: "100%", height: "100%" }}
          />
        </button>

        <div style={styles.divCat} ref={catRef}>
          {categories.map((cat, index) => (
            <div key={index} style={styles.catItem}>
              <div style={styles.CategoriesBox}>
                <img src={cat.icon} alt={cat.name} />
              </div>
              <span style={styles.catTitle}>{cat.name}</span>
            </div>
          ))}
        </div>

        <button
          style={styles.arrow}
          onClick={() => scroll("right", catRef, 140)}
        >
          <img
            src={arrowR}
            alt="right"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
      </div>

      {/* Banner */}
      <div style={{ margin: "40px 0" }}>
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          centeredSlides={false}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000 }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          style={{ padding: "20px 0" }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner}
                alt={`banner-${index}`}
                style={{
                  width: "100%",
                  height: "270px",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Productos Destacados */}
      <h2
        style={{
          textAlign: "left",
          padding: "0px 170px",
          marginBottom: "10px",
          fontWeight: "650",
        }}
      >
        Productos Destacados
      </h2>

      <div style={styles.scrollWrapper}>
        <button
          style={styles.arrow}
          onClick={() => scroll("left", prodRef, 140)}
        >
          <img
            src={arrowL}
            alt="left"
            style={{ width: "100%", height: "100%" }}
          />
        </button>

        <div style={styles.divProducts} ref={prodRef}>
          {products.map((p, i) => (
            <div key={i} style={styles.productBox}>
              <div style={styles.topRow}>
                <span style={styles.badge}>Oferta</span>
                <div style={styles.stars}>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
              </div>

              <img src={p.img} alt={p.name} style={styles.productImg} />
              <p style={styles.productName}>{p.name}</p>
              <p style={styles.productPrice}>{p.price}</p>
              <button style={styles.addButton}>Agregar</button>
            </div>
          ))}
        </div>

        <button
          style={styles.arrow}
          onClick={() => scroll("right", prodRef, 140)}
        >
          <img
            src={arrowR}
            alt="right"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
      </div>

      {/* Tendencias del mes */}
      <h2
        style={{
          textAlign: "left",
          padding: "0px 170px",
          marginBottom: "10px",
          fontWeight: "650",
        }}
      >
        Tendencias del mes
      </h2>

      <div style={styles.scrollWrapper}>
        <button
          style={styles.arrow}
          onClick={() => scroll("left", prodRef, 140)}
        >
          <img
            src={arrowL}
            alt="left"
            style={{ width: "100%", height: "100%" }}
          />
        </button>

        <div style={styles.divProducts} ref={prodRef}>
          {products.map((p, i) => (
            <div key={i} style={styles.productBox}>
              <div style={styles.topRow}>
                <span style={styles.badge}>Oferta</span>
                <div style={styles.stars}>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
              </div>

              <img src={p.img} alt={p.name} style={styles.productImg} />
              <p style={styles.productName}>{p.name}</p>
              <p style={styles.productPrice}>{p.price}</p>
              <button style={styles.addButton}>Agregar</button>
            </div>
          ))}
        </div>

        <button
          style={styles.arrow}
          onClick={() => scroll("right", prodRef, 140)}
        >
          <img
            src={arrowR}
            alt="right"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
      </div>
    </div>
  );
};

const styles = {
  scrollWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px 80px",
  },
  divCat: {
    display: "flex",
    gap: "60px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    width: "100%",
    padding: "10px 20px",
    scrollbarWidth: "none",
  },
  catItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "80px",
  },
  CategoriesBox: {
    backgroundColor: "white",
    border: "1px solid #FFAC77",
    borderRadius: "25px",
    width: "80px",
    height: "80px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  catTitle: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#000000ff",
    fontWeight: "400",
  },
  arrow: {
    background: "white",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    margin: "0 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  divProducts: {
    display: "flex",
    gap: "60px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    width: "calc(7 *150px + 5 * 50px)",
    padding: "10px 60px",
    scrollbarWidth: "none",
  },
  productBox: {
    flexShrink: 0,
    width: "180px",
    height: "195px",
    border: "1px solid #D8572F",
    borderRadius: "25px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  badge: {
    backgroundColor: "#2b6daf",
    color: "white",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "12px",
  },
  stars: {
    color: "#2b6daf",
    fontSize: "14px",
  },
  productImg: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    marginTop: "8px",
  },
  productName: {
    width: "100%",
    textAlign: "left",
    fontSize: "14px",
    marginTop: "auto",
  },
  productPrice: {
    width: "100%",
    textAlign: "left",
    fontSize: "12px",
    color: "#999",
    marginTop: "4px",
  },
  addButton: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#F0833E",
    color: "white",
    border: "#D8572F",
    borderRadius: "25px",
    padding: "6px 0",
    cursor: "pointer",
  },
};

export default InicioAdmin;
