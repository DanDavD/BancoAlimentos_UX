import React, { useState } from "react";
import CartIcon from "../images/CartIcon.png";
import FilterIcon from "../images/FilterIcon.png";
import logo from "../images/logo.png";
import SearchIcon from "../images/SearchIcon.png";
import UserIcon from "../images/UserIcon.png";
import historialAct from "../images/historialAct.png";
import sistemaVal from "../images/sistemaVal.png";
import reportesPer from "../images/reportesPer.png";
import checkout from "../images/checkout.png";
import soporte from "../images/soporte.png";
import idioma from "../images/idioma.png";
import { Link } from "react-router-dom";

const Headerr = ({ isAdminPage }) => {
  const [logMenu, setLogOpen] = useState(false);

  return (
    <div style={{ ...styles.fixedShell, boxShadow: "none" }}>
      <div style={styles.topBar}>
        <img src={logo} alt="Logo" style={styles.logo} />

        <div style={styles.divBar}>
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
          <button
            style={styles.SmallWrapperUser}
            onClick={() => setLogOpen((prev) => !prev)}
          >
            <img src={UserIcon} alt="User" style={styles.iconUser} />
          </button>
          <span>Bienvenido, Ing. Erick</span>

          {logMenu && (
            <div style={styles.dropdown}>
              {/* Solo en InicioAdmin */}
              {isAdminPage && (
                <Link
                  to="/EditarPerfilAdmin"
                  style={styles.dropdownLink}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#D8572F")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Ver mi Perfil
                </Link>
              )}

              {/* Solo mostrar Iniciar Sesión si NO estamos en InicioAdmin */}
              {!isAdminPage && (
                <Link
                  to="/login"
                  style={styles.dropdownLink}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#D8572F")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Iniciar Sesión
                </Link>
              )}

              {/* Cerrar Sesión solo en InicioAdmin */}
              {isAdminPage && (
                <Link
                  to="/"
                  style={styles.dropdownLink}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#D8572F")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Cerrar Sesión
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={styles.bottomBar}>
        <nav style={styles.nav} aria-label="Categorías">
          <a
            href="#"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D8572F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={historialAct} alt="" style={styles.navIcon} />
            Historial
          </a>

          <a
            href="#"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D8572F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={sistemaVal} alt="" style={styles.navIcon} />
            Sistema de Valoración
          </a>

          <a
            href="#"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D8572F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={reportesPer} alt="" style={styles.navIcon} />
            Reportes Personales
          </a>

          <a
            href="#"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D8572F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={checkout} alt="" style={styles.navIcon} />
            Checkout
          </a>

          <a
            href="#"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D8572F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={soporte} alt="" style={styles.navIcon} />
            Soporte
          </a>

          <a
            href="#"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D8572F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={idioma} alt="" style={styles.navIcon} />
            Idioma
          </a>
        </nav>
      </div>
    </div>
  );
};

const styles = {
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
    justifyContent: "space-between",
    alignItems: "center",
    height: "90px",
    background: "linear-gradient(to right, #2B6DAF, #2AA6E0)",
    width: "100%",
  },
  divBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "90px",
    width: "600px",
  },
  logo: {
    height: "60px",
    margin: "0 50px",
    objectFit: "contain",
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
    height: "40px",
    width: "40px",
  },
  SmallWrapperUser: {
    backgroundColor: "transparent",
    width: "50px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
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

  dropdown: {
    position: "absolute",
    top: "75px",
    right: "135px",
    width: "170px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "25px",
    boxShadow: "10px 10px 10px rgba(0,0,0,0.15)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 1000,
    border: "2px solid #2b6daf",
  },

  dropdownLink: {
    padding: "8px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "black",
    transition: "background 0.3s, color 0.3s",
  },

  bottomBar: {
    backgroundColor: "#004985",
    height: "55px",
    display: "flex",
    alignItems: "center",
    padding: "0",
    margin: "0",
    width: "100%",
  },

  nav: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    width: "100%",
    height: "100%",
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textDecoration: "none",
    color: "white",
    height: "100%",
    width: "100%",
    transition: "background 0.3s, color 0.3s",
  },

  navIcon: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
};

export default Headerr;
