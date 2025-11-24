import React from "react";
import { Link } from "react-router-dom";

function Header({ onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <img
          src="/logo.png"
          alt="Logo"
          style={styles.logo}
        />
        
      </div>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/ia" style={styles.link}>IA</Link>
        <Link to="/expedientes" style={styles.link}>Expedientes</Link>
        <Link to="/familias" style={styles.link}>Familias</Link>
        <Link to="/hogares" style={styles.link}>Hogares</Link>
        <Link to="/informes" style={styles.link}>Informes</Link>

        <button style={styles.logout} onClick={onLogout}>
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
const styles = {
  header: {
    width: "100%",
    background: "rgba(242, 243, 244, 1) ",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #e5e5e5",   // línea gris tenue
    boxSizing: "border-box",
    borderRadius: "10px",         // igual que el contenedor principal
    marginBottom: "20px",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  logo: {
    width: "200",                // ⭐ LOGO MÁS GRANDE
    height: "90px",
    objectFit: "contain",
  },

  title: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#173f7c",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "#173f7c",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
  },

  logout: {
    background: "#c62828",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};




export default Header;
