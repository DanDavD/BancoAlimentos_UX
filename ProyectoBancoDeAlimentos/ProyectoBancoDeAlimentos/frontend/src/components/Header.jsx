import React, { useState } from "react";
import CartIcon from "../images/CartIcon.png";
import FilterIcon from "../images/FilterIcon.png";
import logo from "../images/logo.png";
import MenuIcon from "../images/MenuIcon.png";
import SearchIcon from "../images/SearchIcon.png";
import UserIcon from "../images/UserIcon.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <img src={logo} alt="Logo" style={styles.logo} />

        <div style={styles.divBar}>
          {/* MENU BUTTON */}
          <div style={{ position: "relative" }}>
            <button
              style={styles.SmallWrapper}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <img src={MenuIcon} alt="Menu" style={styles.icon} />
            </button>

            {/* DROPDOWN MENU */}
            {menuOpen && (
              <div style={styles.dropdown}>
                <a href="#">Historial de actividades</a>
                <a href="#">Idioma</a>
                <a href="#">Cerrar Sesión</a>
                <a href="#">Sleccionar entrega</a>
                <a href="#">Reportes</a>
                <a href="#">Soportes</a>
              </div>
            )}
          </div>

          <div style={styles.searchWrapper}>
            <button style={styles.iconBtn}>
              <img src={FilterIcon} alt="Filter" style={styles.icon} />
            </button>
            <input
              type="text"
              placeholder="Buscar..."
              style={styles.searchInput}
            />
            <button style={styles.iconBtn}>
              <img src={SearchIcon} alt="Search" style={styles.icon} />
            </button>
          </div>

          <button style={styles.SmallWrapper}>
            <img src={CartIcon} alt="CartIcon" style={styles.icon} />
          </button>
        </div>

        <div style={styles.user}>
          <img src={UserIcon} alt="User" style={styles.iconUser} />
          <span>Bienvenido, Ing. Erick</span>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <nav style={styles.nav}>
          <a href="#">Alimentos</a>
          <a href="#">Hogar</a>
          <a href="#">Deporte</a>
          <a href="#">Belleza</a>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5baed6",
    padding: "10px 80px",
    height: "100px",
    gap: "50px",
  },
  divBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5baed6",
    padding: "10px 170px",
    height: "90px",
    width: "1000px",
  },
  logo: {
    height: "100px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "500px",
    margin: "0 20px",
    backgroundColor: "white",
    borderRadius: "25px",
    border: "1px solid #2b6daf",
    padding: "5px 10px",
  },
  SmallWrapper: {
    backgroundColor: "white",
    border: "1px solid #2b6daf",
    borderRadius: "20px",
    width: "50px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "5px 10px",
    fontSize: "14px",
  },
  iconBtn: {
    background: "none",
    border: "none",
    padding: "0 5px",
    cursor: "pointer",
  },
  icon: {
    height: "20px",
    width: "20px",
  },
  iconUser: {
    height: "30px",
    width: "30px",
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "white",
    cursor: "pointer",
    height: "20px",
    width: "250px",
  },
  bottomBar: {
    backgroundColor: "#2b6daf",
    padding: "5px",
    height: "35px",
    color: "white",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    left: "-75px",
    width: "200px",
    backgroundColor: "white",
    border: "1px solid #2b6daf",
    borderRadius: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 1000,
  },
};

export default Header;
