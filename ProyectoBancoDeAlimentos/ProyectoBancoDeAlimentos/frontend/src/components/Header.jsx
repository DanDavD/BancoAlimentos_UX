import React, { useEffect, useRef, useState } from "react";
import CartIcon from "../images/CartIcon.png";
import FilterIcon from "../images/FilterIcon.png";
import logo from "../images/logo.png";
import MenuIcon from "../images/MenuIcon.png";
import SearchIcon from "../images/SearchIcon.png";
import UserIcon from "../images/UserIcon.png";

const HEADER_TOP_H = 100;   // alto barra superior
const HEADER_BOTTOM_H = 40; // alto barra inferior
const HEADER_TOTAL_H = HEADER_TOP_H + HEADER_BOTTOM_H; // 140px

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al click fuera / Esc
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        style={{
          ...styles.fixedShell,
          boxShadow: scrolled ? "0 4px 16px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <img src={logo} alt="Logo" style={styles.logo} />

          <div style={styles.centerRow}>
            {/* MENU */}
            <div style={{ position: "relative" }} ref={menuRef}>
              <button
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                style={styles.SmallWrapper}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <img src={MenuIcon} alt="Menu" style={styles.icon} />
              </button>

              {menuOpen && (
                <div role="menu" style={styles.dropdown}>
                  <a href="#" role="menuitem">Historial de actividades</a>
                  <a href="#" role="menuitem">Idioma</a>
                  <a href="#" role="menuitem">Cerrar Sesión</a>
                  <a href="#" role="menuitem">Seleccionar entrega</a>
                  <a href="#" role="menuitem">Reportes</a>
                  <a href="#" role="menuitem">Soportes</a>
                </div>
              )}
            </div>

            {/* SEARCH */}
            <div style={styles.searchWrapper}>
              <button style={styles.iconBtn} aria-label="Filtrar">
                <img src={FilterIcon} alt="Filtro" style={styles.icon} />
              </button>
              <input
                type="text"
                placeholder="Buscar..."
                style={styles.searchInput}
              />
              <button style={styles.iconBtn} aria-label="Buscar">
                <img src={SearchIcon} alt="Buscar" style={styles.icon} />
              </button>
            </div>

            {/* CART */}
            <button style={styles.SmallWrapper} aria-label="Carrito">
              <img src={CartIcon} alt="Carrito" style={styles.icon} />
            </button>
          </div>

          {/* USER */}
          <button style={styles.user} aria-label="Perfil de usuario">
            <img src={UserIcon} alt="Usuario" style={styles.iconUser} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Bienvenido, Ing. Erick
            </span>
          </button>
        </div>

        {/* BOTTOM BAR / NAV */}
        <div style={styles.bottomBar}>
          <nav style={styles.nav} aria-label="Categorías">
            <a href="#">Alimentos</a>
            <a href="#">Hogar</a>
            <a href="#">Deporte</a>
            <a href="#">Belleza</a>
            {/* agrega más sin romper layout */}
          </nav>
        </div>
      </div>

      {/* Spacer para que el contenido no quede oculto bajo el header fijo */}
      <div style={{ height: HEADER_TOTAL_H }} />
    </>
  );
};

export const HeaderSpacer = () => <div style={{ height: HEADER_TOTAL_H }} />;

const styles = {
  // Contenedor fijo a pantalla completa
  fixedShell: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1000,
    backgroundColor: "#5baed6",
    display: "flex",
    flexDirection: "column",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px min(5vw, 80px)",
    height: `${HEADER_TOP_H}px`,
    gap: "24px",
    backgroundColor: "#5baed6",
  },

  // fila central: flexible y fluida (sin anchos fijos)
  centerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: 0, // permite que el search se encoja sin romper
  },

  logo: {
    height: "100%",
    maxHeight: "80px",
    objectFit: "contain",
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    backgroundColor: "white",
    borderRadius: "999px",
    border: "1px solid #2b6daf",
    padding: "6px 10px",
    gap: "6px",
  },

  SmallWrapper: {
    backgroundColor: "white",
    border: "1px solid #2b6daf",
    borderRadius: "14px",
    width: "46px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flex: "0 0 auto",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "6px 8px",
    fontSize: "14px",
    minWidth: 0,
  },

  iconBtn: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    flex: "0 0 auto",
  },

  icon: { height: "20px", width: "20px" },
  iconUser: { height: "30px", width: "30px", flex: "0 0 auto" },

  user: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    padding: 0,
    maxWidth: 260,
  },

  bottomBar: {
    backgroundColor: "#2b6daf",
    height: `${HEADER_BOTTOM_H}px`,
    display: "flex",
    alignItems: "center",
    padding: "0 min(5vw, 80px)",
    color: "white",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    overflowX: "auto",          // hace el nav “scrollable” en móvil
    whiteSpace: "nowrap",
    scrollbarWidth: "thin",
  },

  dropdown: {
    position: "absolute",
    top: "48px",
    left: 0,
    width: "220px",
    backgroundColor: "white",
    border: "1px solid #2b6daf",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 1100,
  },
};

export default Header;
