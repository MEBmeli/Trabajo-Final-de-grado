// src/components/IAModule.jsx
import React from "react";
import { Link } from "react-router-dom";

function HogaresModule({ onLogout, user }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1>Módulo de familias</h1>
        <div>
          <Link to="/" style={styles.link}>Volver al panel</Link>
          <button style={styles.logout} onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <p>Aquí después vamos a dividir en varias acciones de IA (ej: matching niño-familia, priorización de casos, alertas, etc.).</p>
      </main>
    </div>
  );
}

const styles = {
  page: { maxWidth: "1000px", margin: "0 auto", padding: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    alignItems: "center",
  },
  link: { marginRight: "10px" },
  logout: {
    padding: "6px 12px",
    background: "#cc0000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  main: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default HogaresModule;
